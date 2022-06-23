import React from "react";
import { ThemeProvider } from "styled-components";
import AppLoading from "expo-app-loading";

import theme from "./src/styles/theme";
import { SafeAreaProvider } from "react-native-safe-area-context";
import Routes from "./src/routes";
import { AuthProvider } from "./src/contexts/auth-context";

import { RootSiblingParent } from "react-native-root-siblings";
import ServiceManager from "./src/services/service-manager";
import { ServiceProvider } from "./src/contexts/service-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { useAppConfig } from "./src/contexts/app-config-context";
import NetStatusBottomBar from "./src/modules/components/net-status-bottom-bar";

export default function App() {
  const { isAllLoadingDone } = useAppConfig();

  if (!isAllLoadingDone) {
    return <AppLoading />;
  }

  return (
    <RootSiblingParent>
      <ThemeProvider theme={theme}>
        <StatusBar style="dark" />
        <ServiceProvider serviceManager={ServiceManager.getI()}>
          <SafeAreaProvider>
            <AuthProvider>
              <GestureHandlerRootView style={{ flex: 1 }}>
                <Routes></Routes>
                <NetStatusBottomBar></NetStatusBottomBar>
              </GestureHandlerRootView>
            </AuthProvider>
          </SafeAreaProvider>
        </ServiceProvider>
      </ThemeProvider>
    </RootSiblingParent>
  );
}
