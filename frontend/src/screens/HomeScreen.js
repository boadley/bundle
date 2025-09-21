import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, FlatList } from "react-native";
import { useWallet } from "../context/WalletContext";

const quickActions = [
  { key: "airtime", label: "Buy Airtime", icon: "📱" },
  { key: "bills", label: "Pay Bills", icon: "💡" },
  { key: "bank", label: "Bank Transfer", icon: "🏦" },
  { key: "vouchers", label: "Vouchers", icon: "🎁" },
];

const recentTransactions = [
  { id: "1", type: "Airtime", recipient: "08012345678", amount: "-₦1,000" },
  { id: "2", type: "Bank Transfer", recipient: "Mama J's Kitchen", amount: "-₦12,500" },
];

export default function HomeScreen({ navigation }) {
  const { accountId, balance, getBalance, isConnected, setBalance } = useWallet();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isConnected && accountId) {
      console.log('Fetching balance in HomeScreen for account:', accountId);
      getBalance(accountId).then((bal) => {
        setBalance(bal);
        setLoading(false);
      }).catch((error) => {
        console.error('Error fetching balance in Home:', error);
        setBalance("Error loading balance");
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, [isConnected, accountId, getBalance, setBalance]);

  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Welcome back!</Text>
      {/* Main Balance Card */}
      <View style={styles.balanceCard}>
        <Text style={styles.accountId}>{accountId}</Text>
        {loading ? (
          <Text style={styles.balance}>Loading...</Text>
        ) : (
          <>
            <Text style={styles.balance}>{balance || '0 HBAR'}</Text>
            <Text style={styles.currency}>HBAR</Text>
          </>
        )}
      </View>
      {/* Quick Actions Grid */}
      <View style={styles.quickActionsGrid}>
        {quickActions.map((action) => (
          <TouchableOpacity
            key={action.key}
            style={styles.actionItem}
            onPress={() => {
              if (action.key === "airtime") navigation.navigate("Airtime");
              if (action.key === "bank") navigation.navigate("BankTransfer");
              // Add navigation for other actions as needed
            }}
          >
            <Text style={styles.actionIcon}>{action.icon}</Text>
            <Text style={styles.actionLabel}>{action.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* Recent Transactions */}
      <Text style={styles.sectionTitle}>Recent Transactions</Text>
      <FlatList
        data={recentTransactions}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.transactionItem}>
            <Text style={styles.transactionType}>{item.type}</Text>
            <Text style={styles.transactionRecipient}>{item.recipient}</Text>
            <Text style={styles.transactionAmount}>{item.amount}</Text>
          </View>
        )}
        style={styles.transactionsList}
      />
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
    marginBottom: 16,
  },
  balanceCard: {
    backgroundColor: "#1F2A37",
    borderRadius: 16,
    padding: 24,
    alignItems: "center",
    marginBottom: 24,
  },
  accountId: {
    color: "#A9B4C2",
    fontSize: 14,
    marginBottom: 4,
  },
  balance: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
  },
  currency: {
    color: "#A9B4C2",
    fontSize: 16,
    marginTop: 4,
  },
  quickActionsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  actionItem: {
    width: "22%",
    alignItems: "center",
    marginVertical: 8,
  },
  actionIcon: {
    fontSize: 32,
    marginBottom: 4,
    color: "#FFFFFF",
  },
  actionLabel: {
    color: "#FFFFFF",
    fontSize: 14,
    textAlign: "center",
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 8,
  },
  transactionsList: {
    flexGrow: 0,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1F2A37",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  transactionType: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "500",
    flex: 1,
  },
  transactionRecipient: {
    color: "#A9B4C2",
    fontSize: 14,
    flex: 1,
    textAlign: "center",
  },
  transactionAmount: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    flex: 1,
    textAlign: "right",
  },
});
