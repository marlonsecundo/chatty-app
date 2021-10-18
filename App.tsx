import React, { useEffect } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { ThemeProvider } from "styled-components";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import theme from "./src/styles/theme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Routes from "./src/routes";
import { AuthProvider } from "./src/contexts/auth-context";
import { Roboto_500Medium, Roboto_400Regular } from "@expo-google-fonts/roboto";

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_400Regular,
  });

  if (!fontsLoaded) {
    return <AppLoading />;
  }

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaProvider>
        <AuthProvider>
          <Routes></Routes>
        </AuthProvider>
      </SafeAreaProvider>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
