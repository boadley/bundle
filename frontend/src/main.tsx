import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';

import { createAppKit } from '@reown/appkit/react';
import { WagmiProvider } from 'wagmi';
import { arbitrum, mainnet } from '@reown/appkit/networks';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import type { AppKitNetwork } from '@reown/appkit/networks';

// Custom Hedera Testnet network
const hederaTestnet: AppKitNetwork = {
  id: 296,
  name: 'Hedera Testnet',
  nativeCurrency: { name: 'HBAR', symbol: 'HBAR', decimals: 18 },
  rpcUrls: {
    default: { http: ['https://testnet.hashio.io/api'] }
  },
  blockExplorers: {
    default: { name: 'HashScan', url: 'https://hashscan.io/testnet' }
  },
  testnet: true
} as AppKitNetwork;

// Setup queryClient
const queryClient = new QueryClient();

// Import config
import config from './config';

// Create a metadata object
const metadata = {
  name: config.app.name,
  description: config.app.description,
  url: config.app.url,
  icons: [config.app.icon]
};

// Set the networks
const networks = [mainnet, arbitrum, hederaTestnet] as [AppKitNetwork, ...AppKitNetwork[]];

// Create Wagmi Adapter
const wagmiAdapter = new WagmiAdapter({
  networks,
  projectId: config.projectId,
  ssr: true
});

// Create modal
createAppKit({
  adapters: [wagmiAdapter],
  networks,
  projectId: config.projectId,
  metadata,
  features: {
    analytics: true
  }
});

function AppKitProvider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={wagmiAdapter.wagmiConfig}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppKitProvider>
      <App />
    </AppKitProvider>
  </React.StrictMode>,
);
