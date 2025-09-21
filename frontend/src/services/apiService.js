import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.210.85:3000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

import { Buffer } from "buffer";

// Sponsor a transaction (send unsignedTxBytes, receive signedTxBytes)
export async function sponsorTransaction(unsignedTxBytes) {
  const res = await api.post("/sponsor-transaction", {
    unsignedTxBytes: Buffer.from(unsignedTxBytes).toString("base64"),
  });
  return Buffer.from(res.data.signedTxBytes, "base64");
}

// Resolve a bank account (real-time verification)
export async function resolveAccount(accountNumber, bankCode) {
  const res = await api.post("/resolve-account", {
    accountNumber,
    bankCode,
  });
  return res.data;
}

// Get balance from backend
export async function getBalance(accountId) {
  const res = await api.get(`/get-balance/${accountId}`);
  return res.data.balance;
}

// Initiate a payment (airtime or bank transfer)
export async function initiatePayment(payload) {
  const res = await api.post("/initiate-payment", payload);
  return res.data;
}

export async function createUnsignedTx(txType, amount, recipient, accountId) {
  const res = await api.post("/create-unsigned-tx", {
    txType, // 'airtime' or 'bank'
    amount,
    recipient,
    accountId,
  });
  return Buffer.from(res.data.unsignedTxBytes, "base64");
}

// Execute transaction: create unsigned, sign (mock for now), submit
export async function executeTransaction(txType, amount, recipient, accountId) {
  try {
    // Create unsigned tx on backend
    const unsignedTxBytes = await createUnsignedTx(txType, amount, recipient, accountId);
    // Mock signing (in real: use HashConnect to sign)
    const signedTxBytes = Buffer.from(unsignedTxBytes); // Placeholder
    // Submit to backend
    const txId = await submitSignedTx(signedTxBytes, accountId);
    return txId;
  } catch (error) {
    console.error('Error executing transaction:', error);
    throw error;
  }
}

export async function submitSignedTx(signedTxBytes, accountId) {
  const res = await api.post("/submit-signed-tx", {
    signedTxBytes: Buffer.from(signedTxBytes).toString("base64"),
    accountId,
  });
  return res.data.txId;
}

export default {
  sponsorTransaction,
  resolveAccount,
  initiatePayment,
  createUnsignedTx,
  submitSignedTx,
};
