require("dotenv").config();

// Hedera Mirror Node API endpoint for Testnet
const MIRROR_NODE_URL = 'https://testnet.mirrornode.hedera.com/api/v1';
const MAX_RETRY_ATTEMPTS = 30;
const RETRY_DELAY = 2000; // 2 seconds

/**
 * Fetches a transaction result from the Hedera Mirror Node.
 * @param {string} txHash - The EVM transaction hash (with or without 0x prefix).
 * @returns {Promise<Object|null>} - The transaction result details, or null if not found (404).
 * @throws {Error} - Throws an error for non-404 HTTP errors.
 */
async function fetchTransactionResult(txHash) {
    const cleanHash = txHash.replace('0x', '');
    const url = `${MIRROR_NODE_URL}/contracts/results/${cleanHash}`;
    
    const response = await fetch(url);

    if (response.status === 404) {
        return null; // Transaction not found yet, not an error.
    }

    if (!response.ok) {
        // For other errors (e.g., 500), throw an error to be caught by the polling logic.
        throw new Error(`Mirror node request failed with status: ${response.status}`);
    }

    return response.json();
}

/**
 * Normalizes a Hedera or EVM address to the 0x-prefixed lowercase EVM format.
 * @param {string} address - The address to normalize (e.g., "0.0.12345", "0x...", or raw hex).
 * @returns {string} - The normalized 0x-prefixed lowercase EVM address.
 * @throws {Error} - Throws an error for unknown address formats.
 */
function normalizeAddress(address) {
    if (typeof address !== 'string') {
        throw new Error('Address must be a string.');
    }

    const lowerAddress = address.toLowerCase();

    // Address is already in 0x EVM format
    if (lowerAddress.startsWith('0x')) {
        return lowerAddress;
    }

    // Address is in Hedera 0.0.X format
    if (/^0\.0\.\d+$/.test(lowerAddress)) {
        const accountNum = lowerAddress.split('.')[2];
        // Use BigInt for safety with large account numbers
        const hex = BigInt(accountNum).toString(16).padStart(40, '0');
        return `0x${hex}`;
    }
    
    // Address might be a raw hex string without the '0x' prefix
    if (/^[0-9a-f]{40}$/.test(lowerAddress)) {
        return `0x${lowerAddress}`;
    }

    throw new Error(`Unknown or invalid address format: ${address}`);
}


/**
 * Verifies a transaction by polling the Mirror Node and checking its details.
 * @param {string} txHash - The EVM transaction hash.
 * @param {string} expectedSender - The expected sender address (Hedera or EVM format).
 * @param {string} expectedRecipient - The expected recipient address (Hedera or EVM format).
 * @returns {Promise<boolean>} - True if the transaction is valid and successful, false otherwise.
 */
async function verifyTransaction(txHash, expectedSender, expectedRecipient) {
    try {
        for (let attempt = 0; attempt < MAX_RETRY_ATTEMPTS; attempt++) {
            const result = await fetchTransactionResult(txHash);
            
            if (result) {
                const normalizedTo = normalizeAddress(result.to);
                const normalizedExpectedRecipient = normalizeAddress(expectedRecipient);
                const recipientMatches = normalizedTo === normalizedExpectedRecipient;
                const isSuccessful = result.result === 'SUCCESS' && result.status === '0x1';

                console.log('Transaction verification details:', {
                    recipientMatches,
                    isSuccessful,
                    from: expectedSender,
                    to: normalizedTo
                });

                return recipientMatches && isSuccessful;
            }

            // If result is null (404), wait and retry.
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        }

        console.error('Transaction verification timed out. Hash not found on mirror node.');
        return false;
    } catch (error) {
        console.error('Error during transaction verification:', error);
        return false;
    }
}

/**
 * Waits for a transaction to be confirmed on the Hedera network by polling the mirror node.
 * @param {string} txHash - The EVM transaction hash (must start with 0x).
 * @returns {Promise<object>} - The transaction result from the mirror node.
 * @throws {Error} - Throws if the transaction fails, times out, or an unexpected error occurs.
 */
async function listenForConfirmation(txHash) {
    if (typeof txHash !== 'string' || !txHash.startsWith('0x')) {
        throw new Error('Invalid EVM transaction hash format. Hash must be a string starting with 0x.');
    }

    for (let attempt = 0; attempt < MAX_RETRY_ATTEMPTS; attempt++) {
        try {
            const result = await fetchTransactionResult(txHash);
            
            // Case 1: Transaction is found on the mirror node.
            if (result) {
                const isSuccessful = result.result === 'SUCCESS' && result.status === '0x1';
                
                if (isSuccessful) {
                    console.log(`Transaction ${txHash} confirmed successfully.`);
                    return result; // Success!
                }
                
                // Transaction has a final, failed state.
                throw new Error(result.error_message || `Transaction failed with status: ${result.status} and result: ${result.result}`);
            }

            // Case 2: Transaction not found yet (404). Wait and retry.
            console.log(`Transaction not found, retrying... (Attempt ${attempt + 1}/${MAX_RETRY_ATTEMPTS})`);
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));

        } catch (error) {
            // Case 3: A network error or a final transaction failure.
            console.error(`Error in listenForConfirmation (Attempt ${attempt + 1}):`, error.message);
            
            // If the error is a final transaction failure, re-throw immediately.
            if (error.message.startsWith('Transaction failed')) {
                throw error;
            }

            // For network-type errors, retry until the last attempt.
            if (attempt === MAX_RETRY_ATTEMPTS - 1) {
                throw new Error(`Could not confirm transaction after multiple attempts due to network errors: ${error.message}`);
            }

            // Wait before retrying network errors.
            await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
        }
    }
    
    // Case 4: Polling timed out.
    throw new Error(`Transaction confirmation timed out after ${MAX_RETRY_ATTEMPTS * RETRY_DELAY / 1000} seconds.`);
}

module.exports = {
    verifyTransaction,
    listenForConfirmation,
    // Exporting for testing or other potential uses
    normalizeAddress,
    fetchTransactionResult
};