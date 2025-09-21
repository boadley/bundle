// Import polyfills first
import '@walletconnect/react-native-compat';
import 'react-native-get-random-values';
import { Buffer } from 'buffer';
import './polyfills.js';  // Polyfill for matchMedia in hedera-wallet-connect

// Set up global polyfills
global.Buffer = Buffer;
global.process = global.process || require('process');
global.process.env = global.process.env || {};

// React and React Native imports
import React, { useEffect } from "react";
import { AppRegistry, Linking } from 'react-native';
import { WagmiProvider } from 'wagmi';
import { AppKitProvider } from '@reown/appkit-react-native';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient, wagmiConfig } from "./src/services/walletConfig";
import { WalletProvider } from "./src/context/WalletContext";
import AppNavigator from "./src/navigation/AppNavigator";

// App component
export default function App() {
  // Handle deep links
  useEffect(() => {
    const handleDeepLink = ({ url }) => {
      console.log('Deep link received:', url);
    };
    
    // Add event listener for deep links
    const subscription = Linking.addEventListener('url', handleDeepLink);
    
    // Check for initial URL
    Linking.getInitialURL().then((url) => {
      if (url) {
        console.log('Initial URL:', url);
      }
    });
    
    // Clean up
    return () => {
      subscription.remove();
    };
  }, []);
  
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <AppKitProvider>
          <WalletProvider>
            <AppNavigator />
          </WalletProvider>
        </AppKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

// Register the app
AppRegistry.registerComponent('main', () => App);
