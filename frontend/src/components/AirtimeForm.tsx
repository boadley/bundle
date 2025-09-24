import React, { useState } from 'react';
import Button from './Button';
import { useBundle } from '../hooks/useBundle';

const networks = ['MTN', 'Glo', 'Airtel', '9mobile'];
const commonAmounts = [500, 1000, 2000, 5000];

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  phoneNumber: string;
  amount: string;
  isLoading: boolean;
}

function ConfirmationModal({ isOpen, onClose, onConfirm, phoneNumber, amount, isLoading }: ConfirmationModalProps) {
  if (!isOpen) return null;

  const usdcCost = (parseFloat(amount) * 0.00085).toFixed(2); // Mock conversion rate

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold text-white mb-4">Confirm Purchase</h3>
        <p className="text-base text-white mb-4">
          You are sending ₦{amount} Airtime to {phoneNumber}.
        </p>
        <p className="text-base text-white mb-6">
          Total Cost: ~{usdcCost} USDC
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

export default function AirtimeForm() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [network, setNetwork] = useState('');
  const [amount, setAmount] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { executePayment, isLoading } = useBundle();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber && network && amount) {
      setShowConfirmation(true);
    }
  };

  const handleConfirm = () => {
    executePayment('airtime', {
      phoneNumber,
      network,
      amount: parseFloat(amount),
    });
    setShowConfirmation(false);
  };

  const handleQuickAmount = (quickAmount: number) => {
    setAmount(quickAmount.toString());
  };

  const usdcCost = amount ? (parseFloat(amount) * 0.00085).toFixed(2) : '0.00';

  return (
    <>
      <div className="lg:bg-surface lg:rounded-xl lg:p-6">
        <h2 className="text-2xl font-bold text-white mb-6 lg:text-xl lg:mb-4">Buy Airtime</h2>
        <form className="space-y-6 lg:space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-base text-secondary mb-2 lg:text-sm lg:mb-1">Phone Number</label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter phone number"
              className="input-field lg:px-3 lg:py-2 lg:text-sm"
              required
            />
          </div>
          
          <div>
            <label className="block text-base text-secondary mb-2 lg:text-sm lg:mb-1">Network</label>
            <select
              value={network}
              onChange={(e) => setNetwork(e.target.value)}
              className="input-field lg:px-3 lg:py-2 lg:text-sm"
              required
            >
              <option value="">Select network</option>
              {networks.map((net) => (
                <option key={net} value={net}>{net}</option>
              ))}
            </select>
          </div>
          
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
          
          <div className="flex gap-3 flex-wrap lg:gap-2">
            {commonAmounts.map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => handleQuickAmount(amt)}
                className="px-4 py-2 bg-accent/20 text-accent rounded-lg text-base font-medium hover:bg-accent/30 lg:px-3 lg:py-1 lg:text-sm"
              >
                ₦{amt}
              </button>
            ))}
          </div>
          
          {amount && (
            <div className="text-sm text-secondary">
              Cost: ~{usdcCost} USDC
            </div>
          )}
          
          <Button disabled={!phoneNumber || !network || !amount || isLoading} isLoading={isLoading}>
            Proceed
          </Button>
        </form>
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirm}
        phoneNumber={phoneNumber}
        amount={amount}
        isLoading={isLoading}
      />
    </>
  );
}
