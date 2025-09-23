// Exchange rates and conversion utilities
const HBAR_TO_NGN = 332.239; // Example: 1 HBAR = 1000 NGN

export function calculateHbarAmount(ngnAmount: number): string {
    const hbarAmount = ngnAmount / HBAR_TO_NGN;
    // Format to 8 decimal places to ensure precision
    return hbarAmount.toFixed(8);
}

// Minimum amount for successful transaction
export const MINIMUM_HBAR = '0.00001';