import React, { useState } from 'react';
import Button from './Button';
import { useBundle } from '../hooks/useBundle';

// Network data with colors for visual representation
const networks = [
  { name: 'MTN', code: 'MTN', color: '#FFCC00', textColor: '#000' },
  { name: 'Glo', code: 'Glo', color: '#00A651', textColor: '#fff' },
  { name: 'Airtel', code: 'Airtel', color: '#FF0000', textColor: '#fff' },
  { name: '9mobile', code: '9mobile', color: '#00A86B', textColor: '#fff' }
];

// Preset amounts with cashback
const presetAmounts = [
  { amount: 50, cashback: 2 },
  { amount: 100, cashback: 5 },
  { amount: 200, cashback: 10 },
  { amount: 500, cashback: 25 },
  { amount: 1000, cashback: 50 },
  { amount: 2000, cashback: 100 }
];

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  phoneNumber: string;
  amount: string;
  network: string;
  isLoading: boolean;
}

function ConfirmationModal({ isOpen, onClose, onConfirm, phoneNumber, amount, network, isLoading }: ConfirmationModalProps) {
  if (!isOpen) return null;

  const hbarCost = (parseFloat(amount) * 0.00085).toFixed(4); // Mock conversion rate

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-semibold text-white mb-4">Confirm Purchase</h3>
        <p className="text-base text-white mb-4">
          You are sending ₦{amount} {network} Airtime to {phoneNumber}.
        </p>
        <p className="text-base text-white mb-6">
          Total Cost: ~{hbarCost} HBAR
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
  const [selectedNetwork, setSelectedNetwork] = useState<typeof networks[0] | null>(null);
  const [amount, setAmount] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);

  const { executePayment, isLoading } = useBundle();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber && selectedNetwork && amount) {
      setShowConfirmation(true);
    }
  };

  const handleConfirm = () => {
    if (selectedNetwork) {
      executePayment('airtime', {
        phoneNumber,
        network: selectedNetwork.code,
        amount: parseFloat(amount),
      });
      setShowConfirmation(false);
    }
  };

  const handlePresetAmount = (presetAmount: number) => {
    setAmount(presetAmount.toString());
  };

  const hbarCost = amount ? (parseFloat(amount) * 0.00085).toFixed(4) : '0.0000';

  return (
    <>
      <div className="lg:bg-surface lg:rounded-xl lg:p-6">
        <h2 className="text-2xl font-bold text-white mb-6 lg:text-xl lg:mb-4">Buy Airtime</h2>
        
        <form className="space-y-6 lg:space-y-4" onSubmit={handleSubmit}>
          {/* Phone Number Input with Network Selection */}
          <div>
            <label className="block text-base text-secondary mb-3">Phone Number</label>
            
            {/* Network Carousel */}
            <div className="flex space-x-2 mb-3">
              {networks.map((network) => (
                <button
                  key={network.code}
                  type="button"
                  onClick={() => setSelectedNetwork(network)}
                  className={`w-12 h-12 rounded-lg flex items-center justify-center text-xs font-bold transition-all duration-200 ${
                    selectedNetwork?.code === network.code
                      ? 'ring-2 ring-accent scale-105'
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  style={{ 
                    backgroundColor: network.color, 
                    color: network.textColor 
                  }}
                >
                  {network.name === '9mobile' ? '9M' : network.name.slice(0, 3)}
                </button>
              ))}
            </div>
            
            {/* Phone Number Input */}
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter phone number"
              className="input-field"
              required
            />
          </div>

          {/* Top-Up Amount Selection */}
          <div>
            <label className="block text-base text-secondary mb-3">Top-Up Amount</label>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {presetAmounts.map((preset) => (
                <button
                  key={preset.amount}
                  type="button"
                  onClick={() => handlePresetAmount(preset.amount)}
                  className={`p-3 rounded-lg border transition-all duration-200 ${
                    amount === preset.amount.toString()
                      ? 'border-accent bg-accent/10 text-accent'
                      : 'border-disabled bg-surface text-white hover:border-accent/50'
                  }`}
                >
                  <div className="text-sm font-bold">₦{preset.amount}</div>
                  <div className="text-xs text-success">+₦{preset.cashback} cashback</div>
                </button>
              ))}
            </div>
          </div>

          {/* Manual Amount Input */}
          <div>
            <label className="block text-base text-secondary mb-2">Custom Amount</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="₦ 50-500,000"
              className="input-field"
              min="50"
              max="500000"
            />
          </div>

          {amount && (
            <div className="text-sm text-secondary">
              Cost: ~{hbarCost} HBAR
            </div>
          )}

          <Button 
            disabled={!phoneNumber || !selectedNetwork || !amount || isLoading} 
            isLoading={isLoading}
          >
            Pay
          </Button>
        </form>
      </div>

      <ConfirmationModal
        isOpen={showConfirmation}
        onClose={() => setShowConfirmation(false)}
        onConfirm={handleConfirm}
        phoneNumber={phoneNumber}
        amount={amount}
        network={selectedNetwork?.name || ''}
        isLoading={isLoading}
      />
    </>
  );
}