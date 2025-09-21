import { useAppKit } from '@reown/appkit-react-native';
import { useAccount, useWagmi } from 'wagmi';

// Hook for AppKit WalletConnect integration (native Hedera testnet)
export function useWalletConnect() {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  const { request } = useWagmi(); // For sending custom requests

  const connect = async () => {
    if (!isConnected) {
      await open(); // Opens modal for Hedera wallets
      console.log('Wallet connection modal opened');
    }
  };

  const disconnect = async () => {
    // AppKit handles disconnect via modal or hook; assume open with disconnect option or use clear
    console.log('Disconnect wallet');
    // Use AppKit's internal disconnect if available; otherwise, open modal again for disconnect
  };

  const signTransaction = async (txBytes) => {
    if (!isConnected) throw new Error('Wallet not connected');
    
    try {
      console.log('Signing transaction...');
      // Use wagmi's request for custom JSON-RPC in hedera namespace
      const signedTxBytes = await request({
        method: 'hedera_signTransaction',
        params: [txBytes],
      });
      
      console.log('Transaction signed successfully');
      return signedTxBytes;
    } catch (error) {
      console.error('Error signing transaction:', error);
      throw error;
    }
  };

  const getAccountId = () => address || null;

  const isConnectedCheck = () => isConnected;

  return {
    connect,
    disconnect,
    signTransaction,
    isConnected: isConnectedCheck(),
    accountId: getAccountId(),
  };
}
