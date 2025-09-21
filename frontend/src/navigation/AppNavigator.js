import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";
import AirtimeScreen from "../screens/AirtimeScreen";
import BankTransferScreen from "../screens/BankTransferScreen";
import SuccessScreen from "../screens/SuccessScreen";
import { useWallet } from "../context/WalletContext";

const Stack = createStackNavigator();

export default function AppNavigator() {
  const { isConnected } = useWallet();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Airtime" component={AirtimeScreen} />
        <Stack.Screen name="BankTransfer" component={BankTransferScreen} />
        <Stack.Screen name="Success" component={SuccessScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
