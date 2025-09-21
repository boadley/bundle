import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image, Alert } from "react-native";
import { useWallet } from "../context/WalletContext";

export default function LoginScreen({ navigation }) {
  const { connect, isConnected, accountId } = useWallet();
  const [loading, setLoading] = useState(false);

  const handleConnect = async () => {
    setLoading(true);
    try {
      await connect();
      // Navigate to Home after successful connect
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Connection Failed', error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isConnected) {
      navigation.navigate('Home');
    }
  }, [isConnected, navigation]);

  return (
    <View style={styles.container}>
      {/* App Logo */}
      <View style={styles.logoContainer}>
        {/* Abstract "B" logo as a placeholder */}
        <Image
          source={require("../../assets/images/icon.png")}
          style={styles.logo}
        />
      </View>
      {/* Headline */}
      <Text style={styles.headline}>Spend Crypto on Anything in Nigeria.</Text>
      {/* Connect Wallet Button */}
      <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={handleConnect} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Connecting...' : 'Connect Wallet'}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0D1B2A",
    alignItems: "center",
    justifyContent: "center",
    padding: 24,
  },
  logoContainer: {
    marginBottom: 32,
  },
  logo: {
    width: 80,
    height: 80,
    resizeMode: "contain",
  },
  headline: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 40,
  },
  button: {
    backgroundColor: "#00F5D4",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 48,
    marginBottom: 16,
  },
  buttonText: {
    color: "#0D1B2A",
    fontSize: 16,
    fontWeight: "bold",
  },
  connectedText: {
    color: "#A9B4C2",
    marginTop: 16,
    fontSize: 14,
  },
  buttonDisabled: {
    opacity: 0.7,
  },
});
