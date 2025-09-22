import { useState } from 'react';
import { useAppKitAccount } from '@reown/appkit/react';
import { useSendTransaction } from 'wagmi';
import { toast } from 'react-hot-toast';
import { parseEther } from 'viem';
import { initiatePayment } from '../services/apiService';

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
      const treasuryAddress = import.meta.env.VITE_TREASURY_ACCOUNT_ID as string;
      
      if (!treasuryAddress) {
        throw new Error('Treasury address not configured');
      }

      // Send transaction using Wagmi
      const hash = await sendTransactionAsync({
        to: treasuryAddress as `0x${string}`,
        value: parseEther('0.000000000000000001'), // 1 wei
      });

      // Use transaction hash as transaction ID for backend
      await initiatePayment({ 
        transactionId: hash, 
        paymentType, 
        details 
      });

      toast.success('Payment initiated successfully!');
    } catch (error: any) {
      console.error('Payment error:', error);
      toast.error('Payment failed: ' + (error.message || 'Unknown error'));
    } finally {
      setIsLoading(false);
    }
  };

  return { executePayment, isLoading };
};
