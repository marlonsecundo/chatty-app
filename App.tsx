import React, { useEffect, useState } from "react";
import { StatusBar, StyleSheet, Text, View } from "react-native";
import { ThemeProvider } from "styled-components";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import theme from "./src/styles/theme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Routes from "./src/routes";
import { AuthProvider } from "./src/contexts/auth-context";
import {
  Roboto_500Medium,
  Roboto_400Regular,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { RootSiblingParent } from "react-native-root-siblings";
import DotEnv from "./src/core/contants/dotenv";
import ServiceManager from "./src/services/service-manager";
import { ServiceProvider } from "./src/contexts/service-context";
import LoadingScreen from "./src/modules/auth/screens/loading";
import NotificationHandler from "./src/core/notification-handler";

export default function App() {
  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_400Regular,
    Roboto_700Bold,
  });

  let [servicesLoaded, setServicesLoaded] = useState(false);

  useEffect(() => {
    async function initServices() {
      await DotEnv.getI().init();
      await ServiceManager.getI().init(DotEnv.getI());
      setServicesLoaded(true);
    }

    initServices();
  }, []);

  if (!fontsLoaded || !servicesLoaded) {
    return <AppLoading />;
  }

  return (
    <RootSiblingParent>
      <ThemeProvider theme={theme}>
        <NotificationHandler dotEnv={DotEnv.getI()} />
        <ServiceProvider serviceManager={ServiceManager.getI()}>
          <SafeAreaProvider>
            <AuthProvider>
              <Routes></Routes>
            </AuthProvider>
          </SafeAreaProvider>
        </ServiceProvider>
      </ThemeProvider>
    </RootSiblingParent>
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
