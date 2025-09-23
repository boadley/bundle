import { useState } from 'react';
import { useAppKitAccount } from '@reown/appkit/react';
import { useSendTransaction } from 'wagmi';
import { toast } from 'react-hot-toast';
import { parseEther } from 'viem';
import { initiatePayment } from '../services/apiService';
import { calculateHbarAmount, MINIMUM_HBAR } from '../utils/currency';
import { withRetry } from '../utils/retry';

export const useBundle = () => {
  const { isConnected, address } = useAppKitAccount();
  const { sendTransactionAsync } = useSendTransaction();
  const [isLoading, setIsLoading] = useState(false);

  const executePayment = async (paymentType: 'bank' | 'airtime', details: {
    amount: number;
    bankName?: string;
    accountNumber?: string;
    accountName?: string;
    phoneNumber?: string;
    network?: string;
  }) => {
    if (!isConnected) {
      toast.error('Wallet not connected');
      return;
    }

    if (!address) {
      toast.error('Wallet address not available');
      return;
    }

    setIsLoading(true);

    try {
      // For MVP: Send a minimal transaction (1 wei) to treasury
      const treasuryAddress = import.meta.env.VITE_TREASURY_ADDRESS as string;
      
      if (!treasuryAddress) {
        throw new Error('Treasury address not configured');
      }

      // Calculate HBAR amount based on NGN amount
      const hbarAmount = calculateHbarAmount(details.amount);
      // Ensure minimum amount for reliable transaction
      const finalAmount = parseFloat(hbarAmount) < parseFloat(MINIMUM_HBAR) 
        ? MINIMUM_HBAR 
        : hbarAmount;

      // Send transaction using Wagmi
      const hash = await sendTransactionAsync({
        to: treasuryAddress as `0x${string}`,
        value: parseEther(finalAmount),
      });

      // Show transaction submitted toast
      toast.success('Transaction submitted! Waiting for confirmation...');

      // Wait a bit for the transaction to be processed
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Use transaction hash and user's address for backend verification with retries
      await withRetry(
        async () => {
          await initiatePayment({ 
            transactionHash: hash, 
            userAddress: address,
            paymentType, 
            details 
          });
        },
        (error: any) => {
          // Extract meaningful error message from Axios error
          const backendError = error?.response?.data?.error || error?.message || 'Unknown error';
          return `Payment verification failed: ${backendError}`;
        }
      );

      toast.success('Payment completed successfully!');
    } catch (error: any) {
      console.error('Payment error:', error);
      // Show a more user-friendly error message
      if (error?.code === 'ERR_BAD_REQUEST') {
        toast.error('Payment is being processed. Please wait a moment and check your transaction history.');
      } else {
        toast.error('Payment failed: ' + (error?.message || 'Unknown error'));
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { executePayment, isLoading };
};
