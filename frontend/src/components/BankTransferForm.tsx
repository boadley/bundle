import React, { useState } from 'react';
import Button from './Button';
import { useBundle } from '../hooks/useBundle';
import { resolveAccount } from '../services/apiService';
import { toast } from 'react-hot-toast';

const banks = ['GTBank', 'Zenith Bank', 'Access Bank', 'UBA'];

export default function BankTransferForm() {
  const [amount, setAmount] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState(false);

  const { executePayment, isLoading } = useBundle();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount && bankName && accountNumber && accountName) {
      executePayment('bank', {
        amount: parseFloat(amount),
        bankName,
        accountNumber,
        accountName,
      });
    }
  };

  const handleVerifyAccount = async () => {
    if (bankName && accountNumber) {
      setIsVerifying(true);
      setVerified(false);
      setAccountName('');
      try {
        const response = await resolveAccount({ bankName, accountNumber });
        setAccountName(response.accountName);
        setVerified(true);
        toast.success('Account verified successfully');
      } catch (error) {
        setAccountName('');
        toast.error('Account verification failed');
      } finally {
        setIsVerifying(false);
      }
    }
  };

  return (
    <div className="bg-surface rounded-xl p-6">
      <h3 className="text-xl font-semibold mb-4 text-white">Bank Transfer</h3>
      <form className="space-y-4" onSubmit={handleSubmit}>
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
        <div>
          <label className="block text-sm font-medium text-secondary mb-1">Bank Name</label>
          <select
            value={bankName}
            onChange={(e) => setBankName(e.target.value)}
            className="w-full px-3 py-2 bg-primary/50 border border-secondary rounded-md text-white focus:border-accent focus:outline-none"
            required
          >
            <option value="">Select bank</option>
            {banks.map((bank) => (
              <option key={bank} value={bank}>{bank}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-secondary mb-1">Account Number</label>
          <div className="flex">
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              onBlur={handleVerifyAccount}
              placeholder="Enter account number"
              className="flex-1 px-3 py-2 bg-primary/50 border border-secondary rounded-l-md text-white placeholder-secondary focus:border-accent focus:outline-none"
              required
              maxLength={10}
            />
            {isVerifying && <div className="bg-primary border border-secondary rounded-r-md p-2">
              <div className="w-4 h-4 border-2 border-secondary border-t-accent rounded-full animate-spin"></div>
            </div>}
            {verified && accountName && <div className="bg-primary border border-secondary rounded-r-md p-2 flex items-center gap-1">
              <div className="w-4 h-4 text-success">✓</div>
              <span className="text-success font-medium">{accountName}</span>
            </div>}
          </div>
        </div>
        <Button 
          type="submit" 
          disabled={!amount || !bankName || !accountNumber || !verified || isLoading} 
          isLoading={isLoading}
        >
          Proceed
        </Button>
      </form>
    </div>
  );
}
