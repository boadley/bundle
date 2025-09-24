import React, { useState } from 'react';
import Header from '../components/Header';
import BankTransferForm from '../components/BankTransferForm';
import AirtimeForm from '../components/AirtimeForm';
import BalanceCard from '../components/BalanceCard';
import QuickActions from '../components/QuickActions';
import RecentTransactions from '../components/RecentTransactions';

type ActiveForm = 'none' | 'airtime' | 'bank';

export default function HomePage() {
  const [activeForm, setActiveForm] = useState<ActiveForm>('none');

  const handleAirtimeClick = () => {
    setActiveForm('airtime');
  };

  const handleBankTransferClick = () => {
    setActiveForm('bank');
  };

  const handleBackToHome = () => {
    setActiveForm('none');
  };

  // Mobile-first design with desktop fallback
  return (
    <div className="bg-primary min-h-screen text-white">
      <Header />
      
      {/* Mobile Layout */}
      <div className="block lg:hidden">
        {activeForm === 'none' ? (
          <main className="p-4">
            <h1 className="text-2xl font-bold text-white mb-6 text-left">Welcome back!</h1>
            <BalanceCard />
            <QuickActions 
              onAirtimeClick={handleAirtimeClick}
              onBankTransferClick={handleBankTransferClick}
            />
            <RecentTransactions />
          </main>
        ) : (
          <main className="p-4">
            <button 
              onClick={handleBackToHome}
              className="flex items-center text-accent mb-4"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            {activeForm === 'airtime' && <AirtimeForm />}
            {activeForm === 'bank' && <BankTransferForm />}
          </main>
        )}
      </div>

      {/* Desktop Layout (unchanged) */}
      <div className="hidden lg:block">
        <main className="p-4 max-w-6xl mx-auto">
          <h1 className="text-2xl font-bold mb-8 text-left">Welcome back!</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <BankTransferForm />
            <AirtimeForm />
          </div>
        </main>
      </div>
    </div>
  );
}
