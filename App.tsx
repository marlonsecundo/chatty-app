import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ThemeProvider } from "styled-components";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import theme from "./src/styles/theme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Routes from "./src/routes";
import { AuthProvider } from "./src/contexts/auth-context";

export default function App() {
  let [fontsLoaded] = useFonts({
    "FantasqueSansMono-Regular": require("./assets/fonts/FantasqueSansMono-Regular.ttf"),
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
