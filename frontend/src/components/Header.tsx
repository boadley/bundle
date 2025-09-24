
import { useAppKitAccount } from '@reown/appkit/react';
import { IoPersonCircleOutline, IoHelpCircleOutline, IoNotificationsOutline } from 'react-icons/io5';
import ConnectWalletButton from './ConnectWalletButton';

export default function Header() {
  const { isConnected, address } = useAppKitAccount();

  // Format address for display
  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`;
  };

  return (
    <header className="bg-primary p-4 flex justify-between items-center">
      {isConnected && address ? (
        <>
          {/* Left side - Profile and greeting */}
          <div className="flex items-center space-x-3">
            <IoPersonCircleOutline className="w-8 h-8 text-white" />
            <div>
              <p className="text-sm text-secondary">Hi,</p>
              <p className="text-white font-medium">{formatAddress(address)}</p>
            </div>
          </div>

          {/* Right side - Help and notifications */}
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1 text-secondary hover:text-white transition-colors">
              <IoHelpCircleOutline className="w-5 h-5" />
              <span className="text-sm font-medium">HELP</span>
            </button>
            <button className="text-secondary hover:text-white transition-colors">
              <IoNotificationsOutline className="w-6 h-6" />
            </button>
          </div>
        </>
      ) : (
        <>
          {/* Not connected state */}
          <div className="text-2xl font-bold text-accent">Bundle</div>
          <ConnectWalletButton />
        </>
      )}
    </header>
  );
}
