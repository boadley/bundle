import React from 'react';
import ConnectWalletButton from '../components/ConnectWalletButton';

// Simple abstract "B" logo component
function BundleLogo() {
  return (
    <div className="w-20 h-20 mb-12 flex items-center justify-center">
      <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Abstract "B" made of two overlapping shapes suggesting bundling/connection */}
        <path 
          d="M20 15 C20 10, 25 5, 35 5 L50 5 C60 5, 65 10, 65 20 C65 25, 62 28, 58 30 C62 32, 65 35, 65 40 C65 50, 60 55, 50 55 L35 55 C25 55, 20 50, 20 40 Z" 
          fill="white" 
          opacity="0.9"
        />
        <path 
          d="M15 25 C15 20, 20 15, 30 15 L45 15 C55 15, 60 20, 60 30 C60 35, 57 38, 53 40 C57 42, 60 45, 60 50 C60 60, 55 65, 45 65 L30 65 C20 65, 15 60, 15 50 Z" 
          fill="white" 
          opacity="0.6"
        />
      </svg>
    </div>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-primary flex flex-col items-center justify-center p-4 text-white">
      <BundleLogo />
      <h2 className="text-2xl font-bold text-white mb-12 text-center max-w-md">
        Spend Crypto on <span className="text-accent">Anything</span> in <span className="text-accent">Nigeria</span>
      </h2>
      <div className="w-full max-w-sm">
        <ConnectWalletButton />
      </div>
    </div>
  );
}
