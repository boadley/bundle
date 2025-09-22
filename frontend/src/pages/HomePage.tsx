import React from 'react';
import Header from '../components/Header';
import BankTransferForm from '../components/BankTransferForm';
import AirtimeForm from '../components/AirtimeForm';

export default function HomePage() {
  return (
    <div className="bg-primary min-h-screen text-white">
      <Header />
      <main className="p-4 max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-8 text-left">Welcome back!</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <BankTransferForm />
          <AirtimeForm />
        </div>
      </main>
    </div>
  );
}
