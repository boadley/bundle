import React, { useState } from "react";
import { Buffer } from "buffer";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Keyboard, FlatList, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useWallet } from "../context/WalletContext";

const commonAmounts = [500, 1000, 2000];

export default function AirtimeScreen() {
  const navigation = useNavigation();
  const { isConnected, executeTransaction, accountId } = useWallet();
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [showConfirm, setShowConfirm] = useState(false);
  const [loading, setLoading] = useState(false);

  // Placeholder: 1 HBAR = 1175 NGN (adjust as needed)
  const hbarRate = 1175;
  const hbarCost = amount ? (parseFloat(amount) / hbarRate).toFixed(4) : "0.0000";

  const handleChipPress = (amt) => {
    setAmount(amt.toString());
    Keyboard.dismiss();
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
      const txId = await executeTransaction('airtime', amount, phone, accountId);
      setShowConfirm(false);
      navigation.navigate("Success", {
        message: `Airtime purchase successful! Tx ID: ${txId}`,
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
      <Text style={styles.header}>Buy Airtime</Text>
      {/* Phone Number Input */}
      <TextInput
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor="#A9B4C2"
        keyboardType="phone-pad"
        value={phone}
        onChangeText={setPhone}
        maxLength={11}
      />
      {/* Amount Input */}
      <TextInput
        style={styles.input}
        placeholder="Amount (NGN)"
        placeholderTextColor="#A9B4C2"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      {/* Common Amount Chips */}
      <View style={styles.chipsRow}>
        {commonAmounts.map((amt) => (
          <TouchableOpacity
            key={amt}
            style={[
              styles.chip,
              amount === amt.toString() && styles.chipSelected,
            ]}
            onPress={() => handleChipPress(amt)}
          >
            <Text
              style={[
                styles.chipText,
                amount === amt.toString() && styles.chipTextSelected,
              ]}
            >
              ₦{amt}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Real-time HBAR Cost */}
      <Text style={styles.usdcCost}>Cost: ~{hbarCost} HBAR</Text>
      {/* Proceed Button */}
      <TouchableOpacity
        style={[
          styles.button,
          !(phone.length === 11 && amount && isConnected) && styles.buttonDisabled,
        ]}
        onPress={handleProceed}
        disabled={!(phone.length === 11 && amount && isConnected)}
      >
        <Text style={styles.buttonText}>Proceed</Text>
      </TouchableOpacity>

      {/* Confirmation Modal */}
      {showConfirm && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <Text style={styles.modalTitle}>Confirm Purchase</Text>
            <Text style={styles.modalSummary}>
              Send ₦{amount} Airtime to {phone}?
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
  chipsRow: {
    flexDirection: "row",
    marginBottom: 16,
  },
  chip: {
    backgroundColor: "#1F2A37",
    borderRadius: 16,
    paddingVertical: 8,
    paddingHorizontal: 20,
    marginRight: 12,
    borderWidth: 1,
    borderColor: "#5A6470",
  },
  chipSelected: {
    backgroundColor: "#00F5D4",
    borderColor: "#00F5D4",
  },
  chipText: {
    color: "#A9B4C2",
    fontSize: 16,
  },
  chipTextSelected: {
    color: "#0D1B2A",
    fontWeight: "bold",
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
