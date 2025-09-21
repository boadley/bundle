// backend/src/routes/apiRoutes.js

const express = require("express");
const router = express.Router();
const hederaService = require("../services/hederaService");
const {
    resolveBankAccount,
    executeBankTransfer,
    executeAirtimePurchase,
} = require("../services/paymentProviderService");

// POST /sponsor-transaction
router.post("/sponsor-transaction", async (req, res) => {
    try {
        const { unsignedTxBytes } = req.body;
        if (!unsignedTxBytes) {
            return res.status(400).json({ error: "unsignedTxBytes is required" });
        }
        // unsignedTxBytes should be base64 encoded from frontend
        const txBytes = Buffer.from(unsignedTxBytes, "base64");
        const signedTxBytes = await hederaService.sponsorTransaction(txBytes);
        res.json({ signedTxBytes: Buffer.from(signedTxBytes).toString("base64") });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// // POST /initiate-payment
// router.post("/initiate-payment", async (req, res) => {
//     try {
//         const { paymentType, details, transactionId } = req.body;
//         if (!paymentType || !details || !transactionId) {
//             return res.status(400).json({ error: "paymentType, details, and transactionId are required" });
//         }

//         // Wait for Hedera transaction confirmation
//         await hederaService.listenForConfirmation(transactionId);

//         let result;
//         if (paymentType === "airtime") {
//             // details: { phoneNumber, amount }
//             result = executeAirtimePurchase(details.phoneNumber, details.amount);
//         } else if (paymentType === "bank_transfer") {
//             // details: { accountNumber, bankCode, amount, accountName, reason }
//             const amountInKobo = Math.round(Number(details.amount) * 100);
//             result = await executeBankTransfer(
//                 details.accountNumber,
//                 details.bankCode,
//                 amountInKobo,
//                 details.accountName,
//                 details.reason
//             );
//         } else {
//             return res.status(400).json({ error: "Invalid paymentType" });
//         }

//         res.json({ status: "completed", paymentResult: result });
//     } catch (err) {
//         res.status(500).json({ error: err.message });
//     }
// });
// POST /initiate-payment
router.post("/initiate-payment", async (req, res) => {
    try {
        console.log("Route started - req.body:", JSON.stringify(req.body, null, 2)); // Log incoming payload

        const { paymentType, details, transactionId } = req.body;
        if (!paymentType || !details || !transactionId) {
            console.log("Validation failed - missing fields");
            return res.status(400).json({ error: "paymentType, details, and transactionId are required" });
        }
        console.log("Validation passed - proceeding to Hedera confirmation");

        // Wait for Hedera transaction confirmation
        console.log(`About to call listenForConfirmation for txId: ${transactionId}`);
        try {
            await hederaService.listenForConfirmation(transactionId);
        } catch (hederaErr) {
            console.error("Hedera confirmation error:", hederaErr);
            return res.status(504).json({ error: "Hedera transaction confirmation timed out or failed. Please try again or check transaction status." });
        }
        console.log("Hedera confirmation received - proceeding to Paystack");

        let result;
        if (paymentType === "airtime") {
            // details: { phoneNumber, amount }
            result = executeAirtimePurchase(details.phoneNumber, details.amount);
        } else if (paymentType === "bank_transfer") {
            // details: { accountNumber, bankCode, amount, accountName, reason }
            const amountInKobo = Math.round(Number(details.amount) * 100);
            result = await executeBankTransfer(
                details.accountNumber,
                details.bankCode,
                amountInKobo,
                details.accountName,
                details.reason
            );
        } else {
            console.log("Invalid paymentType:", paymentType);
            return res.status(400).json({ error: "Invalid paymentType" });
        }

        console.log("Paystack execution completed - sending response");
        res.json({ status: "completed", paymentResult: result });
    } catch (err) {
        console.error("Route error:", err); // Enhanced logging
        res.status(500).json({ error: "An unexpected error occurred. " + err.message });
    }
});

 // POST /resolve-account
router.post("/resolve-account", async (req, res) => {
    try {
        const { accountNumber, bankCode } = req.body;
        if (!accountNumber || !bankCode) {
            return res.status(400).json({ error: "accountNumber and bankCode are required" });
        }
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
