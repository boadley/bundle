const { TransferTransaction, AccountId, Hbar, Client, TransactionId } = require("@hashgraph/sdk");
require("dotenv").config({ path: 'C:/Users/_a4/Downloads/Bundle/backend/.env' });

async function main() {
    // Load environment variables
    const userAccountIdString = process.env.YOUR_DUMMY_USER_ACCOUNT_ID;
    const userPrivateKey = process.env.YOUR_DUMMY_USER_PRIVATE_KEY;
    const treasuryAccountIdString = process.env.TREASURY_ACCOUNT_ID;

    if (!userAccountIdString || !userPrivateKey || !treasuryAccountIdString) {
        throw new Error("Please set YOUR_DUMMY_USER_ACCOUNT_ID, YOUR_DUMMY_USER_PRIVATE_KEY, and TREASURY_ACCOUNT_ID in your .env file");
    }

    // Convert and validate account IDs
    let userAccountId, treasuryAccountId;
    try {
        userAccountId = AccountId.fromString(userAccountIdString.trim());
        console.log('Parsed User Account ID:', userAccountId.toString());
        console.log('Is userAccountId valid?', userAccountId instanceof AccountId);
    } catch (error) {
        throw new Error(`Invalid YOUR_DUMMY_USER_ACCOUNT_ID: ${userAccountIdString} - ${error.message}`);
    }
    try {
        treasuryAccountId = AccountId.fromString(treasuryAccountIdString.trim());
        console.log('Parsed Treasury Account ID:', treasuryAccountId.toString());
        console.log('Is treasuryAccountId valid?', treasuryAccountId instanceof AccountId);
    } catch (error) {
        throw new Error(`Invalid TREASURY_ACCOUNT_ID: ${treasuryAccountIdString} - ${error.message}`);
    }

    // Create a testnet client
    const client = Client.forTestnet();
    console.log('Client network:', client.network);

    // Build the unsigned transaction
    try {
        console.log('Building transaction...');
        const unsignedTransaction = new TransferTransaction()
            .addHbarTransfer(userAccountId, Hbar.fromTinybars(-1)) // Sending 1 tinybar
            .addHbarTransfer(treasuryAccountId, Hbar.fromTinybars(1)); // Receiving 1 tinybar

        // Generate a transaction ID using the treasury account (payer)
        const transactionId = TransactionId.generate(treasuryAccountId);
        console.log('Generated Transaction ID:', transactionId.toString());
        unsignedTransaction.setTransactionId(transactionId);

        console.log('Freezing transaction...');
        unsignedTransaction.freezeWith(client); // Freeze with the client

        // Get the transaction bytes
        const txBytes = unsignedTransaction.toBytes();
        const txBytesAsArray = Array.from(txBytes);

        console.log("SUCCESS! Copy the JSON object below and use it as the body for your request:\n");
        console.log(JSON.stringify({ unsignedTxBytes: txBytesAsArray }));
        
        // Save to file for curl
        const fs = require('fs');
        fs.writeFileSync('transaction.json', JSON.stringify({ unsignedTxBytes: txBytesAsArray }));
        console.log('Transaction JSON saved to transaction.json');
    } catch (error) {
        throw new Error(`Failed to create transaction: ${error.message}`);
    } finally {
        client.close();
    }
}

main().catch(err => {
    console.error('Error:', err);
    process.exit(1);
});