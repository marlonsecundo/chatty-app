import { registerRootComponent } from "expo";
import { View } from "moti";

import App from "./App";
import { AppConfigProvider } from "./src/contexts/app-config-context";
import { NotificationProvider } from "./src/contexts/notification-context";

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately

function RootComponent() {
  return (
    <AppConfigProvider>
      <NotificationProvider>
        <App></App>
      </NotificationProvider>
    </AppConfigProvider>
  );
}

registerRootComponent(RootComponent);
