// backend/src/routes/apiRoutes.js
console.log("--- 2. Loading apiRoutes.js ---");

const express = require("express");
const router = express.Router();
const hederaService = require("../services/hederaService");
const {
    resolveBankAccount,
    executeBankTransfer,
    executeAirtimePurchase,
} = require("../services/paymentProviderService");

// Bank name to code mapping
const BANK_CODES = {
    'GTBank': '058',
    'Zenith Bank': '057',
    'Access Bank': '044',
    'UBA': '033'
};

// Helper function to get bank code from name
function getBankCode(bankName) {
    const code = BANK_CODES[bankName];
    if (!code) {
        throw new Error(`Invalid bank name: ${bankName}`);
    }
    return code;
}

// [REMOVED] Sponsorship endpoint removed as part of EVM migration

// POST /initiate-payment
router.post("/initiate-payment", async (req, res) => {
    try {
        console.log("Route started - req.body:", JSON.stringify(req.body, null, 2));
        
        const { paymentType, details, transactionHash, userAddress } = req.body;
        
        if (!paymentType || !details || !transactionHash || !userAddress) {
            console.log("Validation failed - missing fields");
            return res.status(400).json({ 
                error: "paymentType, details, transactionHash, and userAddress are required" 
            });
        }

        console.log("Validating transaction...");
        
        // Get treasury address from environment
        const treasuryAddress = process.env.TREASURY_ADDRESS;
        if (!treasuryAddress) {
            throw new Error('Treasury address not configured');
        }

        // Verify the transaction matches expected parameters
        const isValid = await hederaService.verifyTransaction(
            transactionHash,
            userAddress,
            treasuryAddress
        );

        if (!isValid) {
            console.log("Transaction verification failed");
            return res.status(400).json({ 
                error: "Transaction verification failed" 
            });
        }

        console.log("Transaction verified, waiting for confirmation...");

        // Wait for Hedera transaction confirmation
        const txResult = await hederaService.listenForConfirmation(transactionHash);
        
        if (!txResult) {
            console.log("Transaction failed to confirm");
            return res.status(400).json({ 
                error: "Transaction failed to confirm" 
            });
        }

        console.log("Transaction confirmed, processing payment...");

        let result;
        if (paymentType === "airtime") {
            // details: { phoneNumber, amount }
            console.log("Processing airtime purchase...");
            result = await executeAirtimePurchase(details.phoneNumber, details.amount);
        } else if (paymentType === "bank") {
            // details: { accountNumber, bankName, amount, accountName }
            console.log("Processing bank transfer...");
            const bankCode = getBankCode(details.bankName);
            const amountInKobo = Math.round(Number(details.amount) * 100);
            result = await executeBankTransfer(
                details.accountNumber,
                bankCode,
                amountInKobo,
                details.accountName
            );
        } else {
            console.log(`Invalid payment type: ${paymentType}`);
            return res.status(400).json({ 
                error: "Invalid payment type. Must be 'bank' or 'airtime'" 
            });
        }

        console.log("Payment processed successfully");
        res.json({ success: true, result });
    } catch (err) {
        console.error('Payment initiation error:', err);
        res.status(500).json({ 
            error: err.message || "Internal server error"
        });
    }
});

 // POST /resolve-account
router.post("/resolve-account", async (req, res) => {
    try {
        const { accountNumber, bankName } = req.body;
        if (!accountNumber || !bankName) {
            return res.status(400).json({ error: "accountNumber and bankName are required" });
        }
        
        // Convert bank name to code if needed by your payment provider
        const bankCode = getBankCode(bankName);
        const result = await resolveBankAccount(accountNumber, bankCode);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /create-unsigned-tx
router.post("/create-unsigned-tx", async (req, res) => {
    try {
        const { txType, amount, recipient, accountId } = req.body;
        if (!txType || !amount || !recipient || !accountId) {
            return res.status(400).json({ error: "txType, amount, recipient, and accountId are required" });
        }
        const unsignedTxBytes = await hederaService.createUnsignedTx(txType, amount, recipient, accountId);
        res.json({ unsignedTxBytes: Buffer.from(unsignedTxBytes).toString("base64") });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// POST /submit-signed-tx
router.post("/submit-signed-tx", async (req, res) => {
    try {
        const { signedTxBytes, accountId } = req.body;
        if (!signedTxBytes || !accountId) {
            return res.status(400).json({ error: "signedTxBytes and accountId are required" });
        }
        const txBytes = Buffer.from(signedTxBytes, "base64");
        const txId = await hederaService.submitSignedTx(txBytes, accountId);
        res.json({ txId });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// GET /get-balance/:accountId
router.get("/get-balance/:accountId", async (req, res) => {
    try {
        const { accountId } = req.params;
        if (!accountId) {
            return res.status(400).json({ error: "accountId is required" });
        }
        const balance = await hederaService.getBalance(accountId);
        res.json({ balance });
    } catch (err) {
        console.error('Error getting balance:', err);
        res.status(500).json({ error: err.message });
    }
});

module.exports = router;
