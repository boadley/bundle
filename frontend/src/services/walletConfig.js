import { createAppKit } from '@reown/appkit-react-native';
import { createWagmiConfig } from '@reown/appkit-adapter-wagmi';
import { QueryClient } from '@tanstack/react-query';
import {
  HederaAdapter,
  HederaChainDefinition,
  hederaNamespace,
} from '@hashgraph/hedera-wallet-connect';

// Project ID
const projectId = 'a4c97a6942dda38a1de34a6b66647344';

// Metadata
const metadata = {
  name: 'Bundle App',
  description: 'Hedera Testnet dApp with WalletConnect',
  url: 'https://yourapp.example.com',
  icons: ['https://yourapp.example.com/icon.png'],
};

// QueryClient for wagmi
const queryClient = new QueryClient();

// HederaAdapter for native testnet
const hederaAdapter = new HederaAdapter({
  projectId,
  networks: [HederaChainDefinition.Native.Testnet],
  namespace: hederaNamespace,
});

// Wagmi config (minimal for AppKit native support)
const wagmiConfig = createWagmiConfig({
  projectId,
  metadata,
});

// Initialize AppKit (call at module level, before rendering)
createAppKit({
  projectId,
  adapters: [hederaAdapter],
  wagmiConfig,
  metadata,
  networks: [HederaChainDefinition.Native.Testnet],
  features: {
    analytics: true,
  },
});

export { queryClient, wagmiConfig, projectId, metadata };
