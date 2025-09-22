import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface ResolveAccountRequest {
  bankName: string;
  accountNumber: string;
}

export interface ResolveAccountResponse {
  accountName: string;
}

export interface InitiatePaymentRequest {
  transactionId: string;
  paymentType: 'bank' | 'airtime';
  details: {
    amount: number;
    bankName?: string;
    accountNumber?: string;
    accountName?: string;
    phoneNumber?: string;
    network?: string;
  };
}

export const resolveAccount = async (request: ResolveAccountRequest): Promise<ResolveAccountResponse> => {
  const response = await api.post('/resolve-account', request);
  return response.data;
};

export const initiatePayment = async (request: InitiatePaymentRequest): Promise<void> => {
  await api.post('/initiate-payment', request);
};

export const sponsorTransaction = async (signedTxBytes: Uint8Array): Promise<Uint8Array> => {
  const response = await api.post('/sponsor-transaction', { signedTxBytes: Array.from(signedTxBytes) });
  return new Uint8Array(response.data.signedTxBytes);
};

export default api;
