
import { useAppKit } from '@reown/appkit/react';
import { useAppKitAccount } from '@reown/appkit/react';

export default function ConnectWalletButton() {
  const { open } = useAppKit();
  const { isConnected, address } = useAppKitAccount();

  if (isConnected && address) {
    return (
      <button
        onClick={() => open({ view: 'Account' })}
        className="text-white bg-transparent border border-disabled px-4 py-2 rounded-lg hover:bg-white/10 transition-colors text-sm"
      >
        {address.slice(0, 6)}...{address.slice(-4)}
      </button>
    );
  }

  return (
    <button
      onClick={() => open()}
      className="btn-primary"
    >
      Connect Wallet
    </button>
  );
}
