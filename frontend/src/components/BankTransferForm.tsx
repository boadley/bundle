import React, { useState } from 'react';
import Button from './Button';
import { useBundle } from '../hooks/useBundle';
import { resolveAccount } from '../services/apiService';
import { toast } from 'react-hot-toast';

const banks = ['GTBank', 'Zenith Bank', 'Access Bank', 'UBA'];

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  amount: string;
  accountName: string;
  isLoading: boolean;
}

function ConfirmationModal({ isOpen, onClose, onConfirm, amount, accountName, isLoading }: ConfirmationModalProps) {
  if (!isOpen) return null;

  const usdcCost = (parseFloat(amount)); // Mock conversion rate

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold text-white mb-4">Confirm Transfer</h3>
        <p className="text-base text-white mb-4">
          You are sending ₦{amount} to {accountName}.
        </p>
        <p className="text-base text-white mb-6">
          Total Cost: ~{usdcCost} NGN
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-3 px-4 border border-disabled text-secondary rounded-xl font-bold"
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 btn-primary"
            disabled={isLoading}
          >
            {isLoading ? 'Processing...' : 'Confirm & Pay'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function BankTransferForm() {
  const [amount, setAmount] = useState('');
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [isVerifying, setIsVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { executePayment, isLoading } = useBundle();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (amount && bankName && accountNumber && accountName) {
      setShowConfirmation(true);
    }
  };

  const handleConfirm = () => {
    executePayment('bank', {
      amount: parseFloat(amount),
      bankName,
      accountNumber,
      accountName,
    });
    setShowConfirmation(false);
  };

  const handleVerifyAccount = async () => {
    if (bankName && accountNumber && accountNumber.length === 10) {
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
        setVerified(false);
        toast.error('Account verification failed');
      } finally {
        setIsVerifying(false);
      }
    }
  };

  const usdcCost = amount ? (parseFloat(amount)) : '0.00';

  return (
    <>
      <div className="lg:bg-surface lg:rounded-xl lg:p-6">
        <h2 className="text-2xl font-bold text-white mb-6 lg:text-xl lg:mb-4">Bank Transfer</h2>
        <form className="space-y-6 lg:space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-base text-secondary mb-2 lg:text-sm lg:mb-1">Amount (NGN)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="input-field lg:px-3 lg:py-2 lg:text-sm"
              required
            />
          </div>
          
          <div>
            <label className="block text-base text-secondary mb-2 lg:text-sm lg:mb-1">Bank Name</label>
            <select
              value={bankName}
              onChange={(e) => setBankName(e.target.value)}
              className="input-field lg:px-3 lg:py-2 lg:text-sm"
              required
            >
              <option value="">Select bank</option>
              {banks.map((bank) => (
                <option key={bank} value={bank}>{bank}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-base text-secondary mb-2 lg:text-sm lg:mb-1">Account Number</label>
            <input
              type="text"
              value={accountNumber}
              onChange={(e) => setAccountNumber(e.target.value)}
              onBlur={handleVerifyAccount}
              placeholder="Enter account number"
              className="input-field lg:px-3 lg:py-2 lg:text-sm"
              required
              maxLength={10}
            />
            
            {/* Account verification status */}
            <div className="mt-2 min-h-[24px] flex items-center">
              {isVerifying && (
                <div className="flex items-center text-secondary">
                  <div className="w-4 h-4 border-2 border-secondary border-t-accent rounded-full animate-spin mr-2"></div>
                  <span className="text-sm">Verifying account...</span>
                </div>
              )}
              {verified && accountName && (
                <div className="flex items-center text-success">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span className="text-base font-semibold">{accountName}</span>
                </div>
              )}
            </div>
          </div>
          
          {amount && (
            <div className="text-sm text-secondary">
              Cost: ~{usdcCost} NGN
            </div>
          )}
          
          <Button 
            type="submit" 
            disabled={!amount || !bankName || !accountNumber || !verified || isLoading} 
            isLoading={isLoading}
          >
            Proceed
          </Button>
        </form>
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirm}
        amount={amount}
        accountName={accountName}
        isLoading={isLoading}
      />
    </>
  );
}
