const fetch = require('node-fetch');
require("dotenv").config();

// Hedera Mirror Node API endpoint for Testnet
const MIRROR_NODE_URL = 'https://testnet.mirrornode.hedera.com/api/v1';
const MAX_RETRY_ATTEMPTS = 30;
const RETRY_DELAY = 2000; // 2 seconds

/**
 * Fetch transaction result from Mirror Node
 * @param {string} txHash - The EVM transaction hash (without 0x prefix)
 * @returns {Promise<Object>} - Transaction result details
 */
async function fetchTransactionResult(txHash) {
    // Remove '0x' prefix if present
    const cleanHash = txHash.replace('0x', '');
    const url = `${MIRROR_NODE_URL}/contracts/results/${cleanHash}`;
    
    const response = await fetch(url);
    if (!response.ok) {
        if (response.status === 404) {
            return null; // Transaction not found yet
        }
        throw new Error(`Mirror node error: ${response.status}`);
    }

    return response.json();
}

/**
 * Normalize address to EVM format
 * @param {string} address - Address to normalize
 * @returns {string} - Normalized address
 */
function normalizeAddress(address) {
    // Convert Hedera format (0.0.xxxxx) to EVM format if needed
    if (address.startsWith('0x')) {
        return address.toLowerCase();
    }
    // Convert from decimal to hex and ensure proper formatting
    const hex = Number(address).toString(16).padStart(40, '0');
    return `0x${hex}`.toLowerCase();
}

/**
 * Verify transaction details from Mirror Node
 * @param {string} txHash - The EVM transaction hash
 * @param {string} expectedSender - Expected sender address
 * @param {string} expectedRecipient - Expected recipient address
 * @returns {Promise<boolean>} - Whether the transaction is valid
 */
async function verifyTransaction(txHash, expectedSender, expectedRecipient) {
    try {
        // Poll until we get a result or timeout
        for (let attempt = 0; attempt < MAX_RETRY_ATTEMPTS; attempt++) {
            const result = await fetchTransactionResult(txHash);
            
            if (result) {
                // Normalize addresses for comparison
                const normalizedFrom = normalizeAddress(result.from);
                const normalizedTo = normalizeAddress(result.to);
                const normalizedExpectedSender = normalizeAddress(expectedSender);
                const normalizedExpectedRecipient = normalizeAddress(expectedRecipient);

                // Verify transaction details
                const senderMatches = normalizedFrom === normalizedExpectedSender;
                const recipientMatches = normalizedTo === normalizedExpectedRecipient;
                const isSuccessful = result.result === 'SUCCESS' && result.status === '0x1';

                console.log('Transaction verification:', {
                    senderMatches,
                    recipientMatches,
                    isSuccessful,
                    normalizedFrom,
                    normalizedTo,
                    normalizedExpectedSender,
                    normalizedExpectedRecipient,
                    result: {
                        status: result.status,
                        result: result.result,
                        error: result.error_message
                    }
                });

                return senderMatches && recipientMatches && isSuccessful;
            }

            // Wait before next attempt
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        }

        throw new Error('Transaction verification timeout');
    } catch (error) {
        console.error('Error verifying transaction:', error);
        return false;
    }
}

/**
 * Wait for transaction confirmation using Mirror Node
 * @param {string} txHash - The EVM transaction hash (e.g., "0x109b7ad5890f2c2cccf8536bc6065674b9be1b462b835fdccbdd39c1780e00f2")
 * @returns {Promise<object>} - Transaction result details from the mirror node
 */
async function listenForConfirmation(txHash) {
    if (!txHash.startsWith('0x')) {
        throw new Error('Invalid EVM transaction hash format. Hash must start with 0x');
    }

    for (let attempt = 0; attempt < MAX_RETRY_ATTEMPTS; attempt++) {
        try {
            const result = await fetchTransactionResult(txHash);
            if (result) {
                // Check both result and status fields
                const isSuccessful = result.result === 'SUCCESS' && result.status === '0x1';
                
                // If transaction failed, throw error with any available message
                if (!isSuccessful) {
                    throw new Error(result.error_message || `Transaction failed with status: ${result.status}`);
                }
                
                console.log(`Transaction ${txHash} confirmed with status: SUCCESS`);
                return result;
            }
            
            console.log(`Transaction ${txHash} not found yet, retrying... (attempt ${attempt + 1}/${MAX_RETRY_ATTEMPTS})`);
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        } catch (error) {
            console.error(`Attempt ${attempt + 1} failed:`, error);
            if (attempt === MAX_RETRY_ATTEMPTS - 1) {
                throw error;
            }
            // For retryable errors, continue polling
            if (!error.message.includes('Mirror node error: 404')) {
                throw error; // Propagate non-retryable errors
            }
        }
    }
    
    throw new Error(`Transaction confirmation timed out after ${MAX_RETRY_ATTEMPTS * RETRY_DELAY / 1000} seconds for hash: ${txHash}`);
}

module.exports = {
    verifyTransaction,
    listenForConfirmation
};