import React from 'react';
import { useAppKitAccount } from '@reown/appkit/react';
import { useBalance } from 'wagmi';

export default function BalanceCard() {
  const { address, isConnected } = useAppKitAccount();
  
  // Get HBAR balance using wagmi
  const { data: balance, isLoading } = useBalance({
    address: address as `0x${string}`,
    query: {
      enabled: !!address && isConnected,
    },
  });
  
  // Mock account ID for display (in real app, you'd fetch this from Hedera)
  const mockAccountId = "0.0.6886568";
  
  // Format address to show account ID style
  const displayAccountId = address ? mockAccountId : "Not connected";
  
  // Convert HBAR to USD equivalent (mock rate: 1 HBAR = $0.15)
  const hbarToUsd = 332.239;
  const balanceInHbar = balance ? parseFloat(balance.formatted) : 0;
  const balanceInUsd = (balanceInHbar * hbarToUsd).toFixed(2);
  
  return (
    <div className="balance-card mb-8">
      <div className="text-sm text-secondary mb-2">
        {displayAccountId}
      </div>
      <div className="text-4xl font-bold text-white mb-1">
        {isLoading ? (
          <div className="flex items-center">
            <div className="w-6 h-6 border-2 border-secondary border-t-accent rounded-full animate-spin mr-2"></div>
            Loading...
          </div>
        ) : isConnected ? (
          `₦${balanceInUsd}`
        ) : (
          '₦0.00'
        )}
      </div>
      <div className="text-base text-secondary flex items-center justify-center gap-2">
        <span>HBAR</span>
        {isConnected && balance && (
          <span className="text-sm">
            ({parseFloat(balance.formatted).toFixed(4)} HBAR)
          </span>
        )}
      </div>
    </div>
  );
}