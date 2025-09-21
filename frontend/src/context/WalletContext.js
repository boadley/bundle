import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Buffer } from "buffer";
import * as apiService from "../services/apiService";
import walletConnectService from "../services/walletConnect";

// Create context
export const WalletContext = createContext();

// Custom hook to use wallet context
export function useWallet() {
  return useContext(WalletContext);
}

// Wallet provider component
export function WalletProvider({ children }) {
  // State
  const [isConnected, setIsConnected] = useState(false);
  const [accountId, setAccountId] = useState(null);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  
  // Connect wallet with error handling
  const connect = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Connecting wallet...');
      const session = await walletConnectService.connect();
      
      setIsConnected(true);
      setAccountId(session.accountId);
      
      console.log('Wallet connected with account:', session.accountId);
      return session.accountId;
    } catch (error) {
      console.error('Error connecting wallet:', error);
      setError(error.message || 'Failed to connect wallet');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Disconnect wallet with error handling
  const disconnect = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      await walletConnectService.disconnect();
      
      setIsConnected(false);
      setAccountId(null);
      setBalance(null);
      
      console.log('Wallet disconnected successfully');
    } catch (error) {
      console.error('Error disconnecting wallet:', error);
      setError(error.message || 'Failed to disconnect wallet');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);
  
  // Sign and confirm transaction
  const sendAndConfirmTransaction = useCallback(async (txBytes) => {
    if (!isConnected) throw new Error("Wallet not connected");
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Sign transaction using WalletConnect service
      const signedTxBytes = await walletConnectService.signTransaction(txBytes);
      
      // Submit signed transaction to backend
      const txId = await apiService.submitSignedTx(signedTxBytes, accountId);
      
      console.log('Transaction confirmed:', txId);
      return txId;
    } catch (error) {
      console.error('Error sending and confirming transaction:', error);
      setError(error.message || 'Failed to send transaction');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [isConnected, accountId]);
  
  // Get balance from backend
  const getBalance = useCallback(async (accountId) => {
    if (!isConnected) throw new Error("Wallet not connected");
    
    try {
      setIsLoading(true);
      setError(null);
      
      console.log('Fetching balance for account:', accountId);
      const hbarBalance = await apiService.getBalance(accountId);
      
      const balanceString = `${hbarBalance} HBAR`;
      console.log('Balance fetched:', balanceString);
      return balanceString;
    } catch (error) {
      console.error('Error fetching balance:', error);
      setError(error.message || 'Failed to fetch balance');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [isConnected]);
  
  // Execute transaction via backend
  const executeTransaction = useCallback(async (txType, amountNgn, recipient, accountIdParam) => {
    if (!isConnected) throw new Error("Wallet not connected");
    
    try {
      setIsLoading(true);
      setError(null);
      
      const hbarRate = 1175; // Fixed NGN to HBAR rate for MVP
      const amountHbar = (parseFloat(amountNgn) / hbarRate).toString();
      
      console.log('Executing transaction:', { txType, amountHbar, recipient, accountIdParam });
      
      // Create unsigned transaction
      const unsignedTxBytes = await apiService.createUnsignedTx(txType, amountHbar, recipient, accountIdParam);
      
      // Sponsor transaction
      const sponsoredTxBytes = await apiService.sponsorTransaction(unsignedTxBytes);
      
      // Send and confirm transaction
      const txId = await sendAndConfirmTransaction(sponsoredTxBytes);
      
      console.log('Transaction executed successfully:', txId);
      return txId;
    } catch (error) {
      console.error('Error executing transaction:', error);
      setError(error.message || 'Failed to execute transaction');
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [isConnected, sendAndConfirmTransaction]);
  
  // Sync with AppKit connection state
  useEffect(() => {
    setIsConnected(wcConnected);
    setAccountId(wcAccount);
    
    if (wcConnected && wcAccount) {
      console.log('Wallet connected with account:', wcAccount);
      // Optional: Fetch balance on connect
      getBalance(wcAccount);
    }
  }, [wcConnected, wcAccount]);
  
  // Context value
  const value = {
    isConnected,
    accountId,
    balance,
    setBalance,
    connect,
    disconnect,
    sendAndConfirmTransaction,
    getBalance,
    executeTransaction,
    error,
    isLoading,
  };
  
  return (
    <WalletContext.Provider value={value}>
      {children}
    </WalletContext.Provider>
  );
}
