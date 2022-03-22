import {
  Roboto_400Regular,
  Roboto_500Medium,
  Roboto_700Bold,
} from "@expo-google-fonts/roboto";

import { useFonts } from "expo-font";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import DotEnv from "../core/contants/dotenv";
import { ContextHookException } from "../exceptions";
import { HomeStackParamList } from "../routes/home.routes";

import ServiceManager from "../services/service-manager";

enum ThemeType {
  DARK,
  LIGHT,
}

type ReactDispatch<T> = React.Dispatch<React.SetStateAction<T>>;

interface ContextProps {
  isAllLoadingDone: boolean;
  themeType: ThemeType;
  initialRoute: keyof HomeStackParamList;
  setThemeType: ReactDispatch<ThemeType>;
  setInitialRoute: ReactDispatch<keyof HomeStackParamList>;
  setNotificationLoaded: ReactDispatch<boolean>;
}

const AppConfigContext = createContext<ContextProps>({} as ContextProps);

export const AppConfigProvider: React.FC = ({ children }) => {
  const [themeType, setThemeType] = useState(ThemeType.DARK);
  const [initialRoute, setInitialRoute] =
    useState<keyof HomeStackParamList>("Feed");

  // Loadings
  const [servicesLoaded, setServicesLoaded] = useState(false);
  const [notificationLoaded, setNotificationLoaded] = useState(false);

  let [fontsLoaded] = useFonts({
    Roboto_500Medium,
    Roboto_400Regular,
    Roboto_700Bold,
  });

  const initServices = useCallback(async () => {
    await DotEnv.getI().init();
    await ServiceManager.getI().init(DotEnv.getI());

    setServicesLoaded(true);
  }, []);

  useEffect(() => {
    initServices();
  }, []);

  return (
    <AppConfigContext.Provider
      value={{
        themeType,
        initialRoute,
        setThemeType,
        setInitialRoute,
        isAllLoadingDone: fontsLoaded && servicesLoaded && notificationLoaded,
        setNotificationLoaded,
      }}
    >
      {children}
    </AppConfigContext.Provider>
  );
};

export function useAppConfig() {
  const context = useContext(AppConfigContext);

  if (!context) {
    throw ContextHookException({ hookName: "useAppConfig" });
  }

  return context;
}
