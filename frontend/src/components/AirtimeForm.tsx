import React, { useState } from 'react';
import Button from './Button';
import { useBundle } from '../hooks/useBundle';

const networks = ['MTN', 'Glo', 'Airtel', '9mobile'];
const commonAmounts = [500, 1000, 2000, 5000];

export default function AirtimeForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [network, setNetwork] = useState('');
  const [amount, setAmount] = useState('');

  const { executePayment, isLoading } = useBundle();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber && network && amount) {
      executePayment('airtime', {
        phoneNumber,
        network,
        amount: parseFloat(amount),
      });
    }
  };

  const handleQuickAmount = (quickAmount: number) => {
    setAmount(quickAmount.toString());
  };

  return (
    <div className="bg-surface rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-4 text-white">Buy Airtime</h3>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm font-medium text-secondary mb-1">Phone Number</label>
          <input
            type="tel"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            placeholder="Enter phone number"
            className="w-full px-3 py-2 bg-primary/50 border border-secondary rounded-md text-white placeholder-secondary focus:border-accent focus:outline-none"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary mb-1">Network</label>
          <select
            value={network}
            onChange={(e) => setNetwork(e.target.value)}
            className="w-full px-3 py-2 bg-primary/50 border border-secondary rounded-md text-white focus:border-accent focus:outline-none"
            required
          >
            <option value="">Select network</option>
            {networks.map((net) => (
              <option key={net} value={net}>{net}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary mb-1">Amount (NGN)</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Enter amount"
            className="w-full px-3 py-2 bg-primary/50 border border-secondary rounded-md text-white placeholder-secondary focus:border-accent focus:outline-none"
            required
          />
        </div>
        <div className="flex gap-2 flex-wrap">
          {commonAmounts.map((amt) => (
            <button
              key={amt}
              type="button"
              onClick={() => handleQuickAmount(amt)}
              className="px-3 py-1 bg-accent/20 text-accent rounded-md text-sm font-medium hover:bg-accent/30"
            >
              ₦{amt}
            </button>
          ))}
        </div>
        <Button disabled={!phoneNumber || !network || !amount || isLoading} isLoading={isLoading}>
          Proceed
        </Button>
      </form>
    </div>
  );
}
