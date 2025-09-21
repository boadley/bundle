const fetch = require('node-fetch'); // Ensure node-fetch is installed for server-side HTTP requests
const { Client, AccountId, PrivateKey, TransferTransaction, TransactionReceiptQuery, TransactionId, Status, Hbar, AccountBalanceQuery, Transaction } = require("@hashgraph/sdk");
require("dotenv").config();

function getClient() {
    const accountId = process.env.HEDERA_ACCOUNT_ID;
    const privateKey = process.env.HEDERA_PRIVATE_KEY;
    console.log('Hedera env - Account ID:', accountId ? 'set' : 'missing');
    console.log('Hedera env - Private Key:', privateKey ? 'set' : 'missing');
    if (!accountId || !privateKey) {
        throw new Error("Missing HEDERA_ACCOUNT_ID or HEDERA_PRIVATE_KEY in environment variables.");
    }
    const client = Client.forTestnet();
    client.setOperator(AccountId.fromString(accountId), PrivateKey.fromStringECDSA(privateKey));
    return client;
}

/**
 * Get account balance using REST API.
 * @param {string} accountId - The account ID to query.
 * @returns {Promise<string>} - The balance in HBAR as string.
 */
async function getBalance(accountId) {
  const client = getClient();
  try {
    const query = new AccountBalanceQuery()
      .setAccountId(AccountId.fromString(accountId));
    const balance = await query.execute(client);
    return balance.hbars.toString();
  } catch (error) {
    console.error('Error getting balance:', error);
    throw error;
  }
}

/**
 * Create unsigned transfer transaction for airtime or bank transfer.
 * @param {string} txType - 'airtime' or 'bank'.
 * @param {string} amountHbar - Amount in HBAR as string.
 * @param {string} recipientId - Recipient account ID (for mock, use test account).
 * @param {string} userAccountId - The user account ID who is sending the amount.
 * @returns {Promise<Uint8Array>} - Unsigned transaction bytes.
 */
async function createUnsignedTx(txType, amountHbar, recipientId, userAccountId) {
  const client = getClient();
  try {
    const amount = Hbar.from(amountHbar, Hbar.Unit.Hbar);
    const recipient = AccountId.fromString(recipientId || '0.0.96'); // Testnet faucet or mock
    const userAccount = AccountId.fromString(userAccountId);
    const tx = new TransferTransaction()
      .addHbarTransfer(userAccount, amount.negated()) // user pays amount
      .addHbarTransfer(recipient, amount);            // recipient receives amount
    const unsignedTx = await tx.freezeWith(client);
    return unsignedTx.toBytes();
  } catch (error) {
    console.error('Error creating unsigned tx:', error);
    throw error;
  }
}

/**
 * Submit signed transaction bytes.
 * @param {Uint8Array} signedTxBytes - Signed transaction bytes.
 * @returns {Promise<string>} - Transaction ID.
 */
async function submitSignedTx(signedTxBytes) {
  const client = getClient();
  try {
    const tx = Transaction.fromBytes(signedTxBytes);
    await tx.signWithOperator(client); // ensure operator signature for sponsorship
    const resp = await tx.execute(client);
    const receipt = await new TransactionReceiptQuery().setTransactionId(resp.transactionId).execute(client);
    if (receipt.status.toString() !== Status.SUCCESS.toString()) {
      throw new Error(`Transaction failed with status: ${receipt.status.toString()}`);
    }
    return resp.transactionId.toString();
  } catch (error) {
    console.error('Error submitting signed tx:', error);
    throw error;
  }
}

/**
 * Sponsors a transaction by partially signing it as the fee payer.
 * @param {Uint8Array} unsignedTxBytes - The raw bytes of the unsigned transaction.
 * @returns {Promise<Uint8Array>} - The bytes of the partially signed transaction.
 */
async function sponsorTransaction(unsignedTxBytes) {
    const client = getClient();
    try {
        const tx = TransferTransaction.fromBytes(unsignedTxBytes);
        const signedTx = await tx.signWithOperator(client);
        return signedTx.toBytes();
    } catch (err) {
        throw new Error("Failed to sponsor transaction: " + err.message);
    }
}

/**
 * Polls the Hedera mirror node REST API for confirmation of a transaction by ID.
 * Resolves when the transaction status is SUCCESS.
 * @param {string} txId - The transaction ID to confirm (e.g., "0.0.6871104@1758294746.743881069" or "0.0.6871104-1758294746-743881069").
 * @returns {Promise<object>} - The transaction details from the mirror node.
 */
async function listenForConfirmation(txId) {
    const maxAttempts = 10; // 20s max
    const delayMs = 2000;
    let attempts = 0;

    // Validate transaction ID format (accepts @ or - between account and timestamp)
    const txIdRegex = /^\d+\.\d+\.\d+[@-]\d+\.\d{9}$/;
    if (!txIdRegex.test(txId)) {
        throw new Error(`Invalid transaction ID format: ${txId}. Expected format: shard.realm.num@seconds.nanos or shard.realm.num-seconds-nanos (9-digit nanoseconds)`);
    }

    // Convert transaction ID to mirror node format (shard.realm.num-seconds-nanos)
    const formattedTxId = txId.replace(/(.*)@(.*)\.(.*)/, '$1-$2-$3');

    while (attempts < maxAttempts) {
        console.log(`Polling attempt ${attempts + 1} for txId: ${txId}`);
        console.log(`Fetching: https://testnet.mirrornode.hedera.com/api/v1/transactions/${formattedTxId}`);
        try {
            const response = await fetch(
                `https://testnet.mirrornode.hedera.com/api/v1/transactions/${formattedTxId}`,
                { headers: { 'Accept': 'application/json' } }
            );

            if (!response.ok) {
                const errorText = await response.text().catch(() => 'No error details available');
                if (response.status === 404) {
                    console.log(`Transaction ${txId} not found (status ${response.status}: ${errorText}), retrying...`);
                } else if (response.status === 429) {
                    console.warn(`Rate limit hit for txId ${txId}, retrying after delay...`);
                } else {
                    throw new Error(`HTTP error! status: ${response.status}, details: ${errorText}`);
                }
            } else {
                const data = await response.json();
                const transaction = data.transactions && data.transactions.length > 0 ? data.transactions[0] : null;

                if (transaction) {
                    if (transaction.result === 'SUCCESS') {
                        console.log(`Transaction ${txId} confirmed with status: ${transaction.result}`);
                        return transaction;
                    } else {
                        throw new Error(`Transaction failed with status: ${transaction.result}`);
                    }
                }
                console.log(`Transaction ${txId} not found yet, retrying...`);
            }
        } catch (err) {
            console.error(`Error polling txId ${txId}: ${err.message}`);
            // Continue polling for retryable errors (e.g., network issues)
            if (err.message.includes('HTTP error')) {
                throw err; // Propagate non-retryable HTTP errors
            }
        }

        await new Promise(res => setTimeout(res, delayMs));
        attempts++;
    }

    throw new Error(`Transaction confirmation timed out after ${maxAttempts * delayMs / 1000} seconds for txId: ${txId}`);
}

module.exports = {
    getClient,
    getBalance,
    createUnsignedTx,
    submitSignedTx,
    sponsorTransaction,
    listenForConfirmation,
};
