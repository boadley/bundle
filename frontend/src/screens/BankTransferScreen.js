import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ActivityIndicator, Alert } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import apiService from "../services/apiService";
import { useWallet } from "../context/WalletContext";

const banks = [
  { code: "044", name: "Access Bank" },
  { code: "058", name: "GTBank" },
  { code: "011", name: "First Bank" },
  { code: "232", name: "Sterling Bank" },
  // Add more banks as needed
];

export default function BankTransferScreen() {
  const navigation = useNavigation();
  const { isConnected, executeTransaction, accountId } = useWallet();
  const [amount, setAmount] = useState("");
  const [bankCode, setBankCode] = useState(banks[0].code);
  const [accountNumber, setAccountNumber] = useState("");
  const [accountName, setAccountName] = useState("");
  const [verifying, setVerifying] = useState(false);
  const [verified, setVerified] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Placeholder: 1 HBAR = 1175 NGN (adjust as needed)
  const hbarRate = 1175;
  const hbarCost = amount ? (parseFloat(amount) / hbarRate).toFixed(4) : "0.0000";

  // Real-time account verification
  const handleAccountNumberChange = async (val) => {
    setAccountNumber(val);
    setVerified(false);
    setAccountName("");
    if (val.length === 10) {
      setVerifying(true);
      try {
        const res = await apiService.resolveAccount(val, bankCode);
        if (res.account_name) {
          setAccountName(res.account_name);
          setVerified(true);
        } else {
          setAccountName("Not found");
          setVerified(false);
        }
      } catch (err) {
        setAccountName("Error");
        setVerified(false);
      }
      setVerifying(false);
    }
  };

  const handleProceed = () => {
    if (!isConnected) {
      Alert.alert('Wallet Not Connected', 'Please connect your wallet first.');
      return;
    }
    setShowConfirm(true);
  };

  const handleConfirm = async () => {
    if (!isConnected || !accountId) return;
    setLoading(true);
    try {
      const txId = await executeTransaction('bank', amount, accountNumber, accountId);
      setShowConfirm(false);
      navigation.navigate("Success", {
        message: `Bank transfer successful! Tx ID: ${txId}`,
      });
    } catch (error) {
      Alert.alert('Transaction Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Processing...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Bank Transfer</Text>
      {/* Amount Input */}
      <TextInput
        style={styles.input}
        placeholder="Amount (NGN)"
        placeholderTextColor="#A9B4C2"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      {/* Bank Name Dropdown */}
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={bankCode}
          style={styles.picker}
          onValueChange={(itemValue) => setBankCode(itemValue)}
        >
          {banks.map((bank) => (
            <Picker.Item key={bank.code} label={bank.name} value={bank.code} />
          ))}
        </Picker>
      </View>
      {/* Account Number Input */}
      <View style={styles.accountRow}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Account Number"
          placeholderTextColor="#A9B4C2"
          keyboardType="numeric"
          value={accountNumber}
          onChangeText={handleAccountNumberChange}
          maxLength={10}
        />
        {verifying && (
          <ActivityIndicator size="small" color="#FFFFFF" style={{ marginLeft: 8 }} />
        )}
        {verified && (
          <Text style={styles.verifiedCheck}>✔️</Text>
        )}
      </View>
      {/* Account Name Display */}
      {accountName ? (
        <Text style={[styles.accountName, verified ? styles.accountNameVerified : styles.accountNameError]}>
          {accountName}
        </Text>
      ) : null}
      {/* Real-time HBAR Cost */}
      <Text style={styles.usdcCost}>Cost: ~{hbarCost} HBAR</Text>
      {/* Proceed Button */}
      <TouchableOpacity
        style={[
          styles.button,
          !(amount && accountNumber.length === 10 && verified && isConnected && accountId) && styles.buttonDisabled,
        ]}
        onPress={handleProceed}
        disabled={!(amount && accountNumber.length === 10 && verified && isConnected && accountId)}
      >
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>

      {/* Confirmation Modal */}
      {showConfirm && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Confirm Transfer</Text>
            <Text style={styles.modalSummary}>
              Send ₦{amount} to {accountName} ({accountNumber})?
            </Text>
            <Text style={styles.modalCost}>Total Cost: ~{hbarCost} HBAR</Text>
            <TouchableOpacity
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleConfirm}
              disabled={loading}
            >
              <Text style={styles.buttonText}>{loading ? 'Confirming...' : 'Confirm & Pay'}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setShowConfirm(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1B2A",
    padding: 24,
  },
  header: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#1F2A37",
    color: "#FFFFFF",
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#5A6470",
  },
  pickerContainer: {
    backgroundColor: "#1F2A37",
    borderRadius: 8,
    borderWidth: 1,
    borderColor: "#5A6470",
    marginBottom: 16,
  },
  picker: {
    color: "#FFFFFF",
    height: 48,
    width: "100%",
  },
  accountRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  verifiedCheck: {
    color: "#2ECC71",
    fontSize: 24,
    marginLeft: 8,
  },
  accountName: {
    fontSize: 16,
    marginBottom: 8,
    marginLeft: 4,
  },
  accountNameVerified: {
    color: "#2ECC71",
    fontWeight: "bold",
  },
  accountNameError: {
    color: "#E74C3C",
  },
  usdcCost: {
    color: "#A9B4C2",
    fontSize: 14,
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#00F5D4",
    borderRadius: 12,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 8,
  },
  buttonDisabled: {
    backgroundColor: "#5A6470",
  },
  buttonText: {
    color: "#0D1B2A",
    fontSize: 16,
    fontWeight: "bold",
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(13,27,42,0.8)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalCard: {
    backgroundColor: "#1F2A37",
    borderRadius: 16,
    padding: 32,
    alignItems: "center",
    width: "90%",
  },
  modalTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
  },
  modalSummary: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 8,
    textAlign: "center",
  },
  modalCost: {
    color: "#A9B4C2",
    fontSize: 16,
    marginBottom: 24,
  },
  cancelButton: {
    marginTop: 8,
  },
  cancelButtonText: {
    color: "#A9B4C2",
    fontSize: 16,
  },
});
