import { useState } from 'react';
import { useAppKitAccount } from '@reown/appkit/react';
import { useBalance } from 'wagmi';
import { IoEyeOutline, IoEyeOffOutline, IoChevronForwardOutline } from 'react-icons/io5';

export default function AvailableBalanceCard() {
  const { address, isConnected } = useAppKitAccount();
  const [showBalance, setShowBalance] = useState(true);
  
  // Get HBAR balance using wagmi
  const { data: balance, isLoading } = useBalance({
    address: address as `0x${string}`,
    query: {
      enabled: !!address && isConnected,
    },
  });
  
  // Convert HBAR to NGN (mock rate: 1 HBAR = 150 NGN)
  const hbarToNgn = 150;
  const balanceInHbar = balance ? parseFloat(balance.formatted) : 0;
  const balanceInNgn = (balanceInHbar * hbarToNgn).toFixed(2);
  
  const toggleBalanceVisibility = () => {
    setShowBalance(!showBalance);
  };

  return (
    <div className="bg-gradient-to-r from-accent/20 to-accent/10 rounded-2xl p-6 mb-6 border border-accent/20">
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-white text-sm">Available Balance</span>
            <button
              onClick={toggleBalanceVisibility}
              className="text-white/70 hover:text-white transition-colors"
            >
              {showBalance ? (
                <IoEyeOutline className="w-4 h-4" />
              ) : (
                <IoEyeOffOutline className="w-4 h-4" />
              )}
            </button>
          </div>
          <div className="text-white text-3xl font-bold">
            {isLoading ? (
              <div className="flex items-center">
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin mr-2"></div>
                Loading...
              </div>
            ) : showBalance ? (
              isConnected ? `₦${balanceInNgn}` : '₦0.00'
            ) : (
              '₦****'
            )}
          </div>
          {isConnected && balance && showBalance && (
            <div className="text-white/70 text-sm mt-1">
              {parseFloat(balance.formatted).toFixed(4)} HBAR
            </div>
          )}
        </div>
        
        <button className="flex items-center space-x-1 text-white/70 hover:text-white transition-colors">
          <span className="text-sm">Transaction History</span>
          <IoChevronForwardOutline className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}