const { AccountId, PrivateKey, Client, TransferTransaction } = require("@hashgraph/sdk"); // v2.64.5
const fs = require("fs");
require("dotenv").config({ path: 'C:/Users/_a4/Downloads/Bundle/backend/.env' });

async function main() {
    // Load environment variables
    const userAccountIdString = process.env.YOUR_DUMMY_USER_ACCOUNT_ID;
    const userPrivateKeyString = process.env.YOUR_DUMMY_USER_PRIVATE_KEY;
    const treasuryAccountIdString = process.env.TREASURY_ACCOUNT_ID;

    if (!userAccountIdString || !userPrivateKeyString || !treasuryAccountIdString) {
        throw new Error("Please set YOUR_DUMMY_USER_ACCOUNT_ID, YOUR_DUMMY_USER_PRIVATE_KEY, and TREASURY_ACCOUNT_ID in your .env file");
    }

    // Convert and validate account ID and private key
    let userAccountId, userPrivateKey, treasuryAccountId;
    try {
        userAccountId = AccountId.fromString(userAccountIdString.trim());
        console.log('Parsed User Account ID:', userAccountId.toString());
        userPrivateKey = PrivateKey.fromStringECDSA(userPrivateKeyString.trim());
        console.log('Parsed User Public Key:', userPrivateKey.publicKey.toString());
        treasuryAccountId = AccountId.fromString(treasuryAccountIdString.trim());
        console.log('Parsed Treasury Account ID:', treasuryAccountId.toString());
    } catch (error) {
        throw new Error(`Invalid environment variables: ${error.message}`);
    }

    // Create a testnet client with the treasury as operator
    const client = Client.forTestnet();
    client.setOperator(treasuryAccountId, userPrivateKey);

    try {
        // Read the signedTxBytes from the server response
        const signedTxResponse = JSON.parse(fs.readFileSync("signedTx.json"));
        console.log("Raw signedTxBytes (base64):", signedTxResponse.signedTxBytes);
        if (!signedTxResponse.signedTxBytes) {
            throw new Error("signedTxBytes is missing in signedTx.json");
        }

        // Decode base64-encoded signedTxBytes
        const signedTxBytes = Buffer.from(signedTxResponse.signedTxBytes, "base64");
        console.log("Decoded signedTxBytes (hex):", signedTxBytes.toString("hex"));
        console.log("Decoded signedTxBytes length:", signedTxBytes.length);

        // Reconstruct the signed transaction
        console.log("Reconstructing signed transaction...");
        const transaction = TransferTransaction.fromBytes(signedTxBytes);

        // Log transaction details for debugging
        console.log("Deserialized transaction:", transaction);
        console.log("hbarTransfers type:", typeof transaction.hbarTransfers);
        console.log("hbarTransfers value:", transaction.hbarTransfers);
        console.log("Transaction details:", {
            transactionId: transaction.transactionId?.toString(),
            hbarTransfers: transaction.hbarTransfers instanceof Map
                ? Array.from(transaction.hbarTransfers.entries()).map(([accountId, amount]) => ({
                      accountId: accountId.toString(),
                      amount: amount.toString()
                  }))
                : "hbarTransfers is not a Map or is undefined"
        });

        // Add the user's signature
        console.log("Adding user signature for account:", userAccountId.toString());
        const signedTransaction = await transaction.sign(userPrivateKey);

        // Submit the transaction to the Hedera testnet
        console.log("Submitting transaction...");
        const txResponse = await signedTransaction.execute(client);

        // Get the transaction receipt
        const receipt = await txResponse.getReceipt(client);
        console.log("Transaction status:", receipt.status.toString());
        console.log("Transaction ID:", txResponse.transactionId.toString());
        console.log("Hashscan URL:", `https://hashscan.io/testnet/tx/${txResponse.transactionId}`);
    } catch (error) {
        throw new Error(`Failed to submit transaction: ${error.message}`);
    } finally {
        client.close();
    }
}

main().catch(err => {
    console.error("Error:", err);
    process.exit(1);
});