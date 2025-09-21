import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";

export default function SuccessScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const message = route.params?.message || "Transaction completed successfully!";

  return (
    <View style={styles.container}>
      {/* Large checkmark icon */}
      <View style={styles.iconCircle}>
        <Text style={styles.checkmark}>✔️</Text>
      </View>
      {/* Title */}
      <Text style={styles.title}>Success!</Text>
      {/* Details */}
      <Text style={styles.details}>{message}</Text>
      {/* Done Button */}
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")}
      >
        <Text style={styles.buttonText}>Done</Text>
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
  iconCircle: {
    backgroundColor: "#2ECC71",
    borderRadius: 64,
    width: 128,
    height: 128,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 32,
  },
  checkmark: {
    fontSize: 64,
    color: "#FFFFFF",
  },
  title: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 16,
  },
  details: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 32,
  },
  button: {
    backgroundColor: "#00F5D4",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 48,
  },
  buttonText: {
    color: "#0D1B2A",
    fontSize: 16,
    fontWeight: "bold",
  },
});
