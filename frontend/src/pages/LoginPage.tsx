import React from 'react';
import ConnectWalletButton from '../components/ConnectWalletButton';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-4 text-white">
      <div className="text-6xl font-bold text-accent mb-8">Bundle</div>
      <h2 className="text-2xl font-bold mb-8 text-center max-w-md">
        Spend Crypto on Anything in Nigeria
      </h2>
      <ConnectWalletButton />
    </div>
  );
}
