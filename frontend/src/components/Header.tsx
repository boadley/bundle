import React from 'react';
import ConnectWalletButton from './ConnectWalletButton';

export default function Header() {
  return (
    <header className="bg-primary/80 backdrop-blur-md p-4 flex justify-between items-center sticky top-0 z-10">
      <div className="text-headline text-accent lg:text-2xl">Bundle</div>
      <div className="lg:block">
        <ConnectWalletButton />
      </div>
    </header>
  );
}
