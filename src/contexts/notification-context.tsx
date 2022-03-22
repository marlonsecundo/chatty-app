import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";

import messaging, {
  FirebaseMessagingTypes,
} from "@react-native-firebase/messaging";
import { useAppConfig } from "../contexts/app-config-context";
import { ContextHookException, InvalidRouteException } from "../exceptions";
import { HomeStackParamList } from "../routes/home.routes";
import { NavigationProp } from "@react-navigation/native";
import NotificationService from "../services/notification.service";
import * as Notifications from "expo-notifications";

interface ContextProps {
  handleNotificationOpenedApp: (
    navigationHook: NavigationProp<HomeStackParamList>
  ) => () => void;
  handleMessageToken: (
    notificationService: NotificationService,
    userToken: string
  ) => Promise<void>;
}

const NotificationContext = createContext<ContextProps>({} as ContextProps);

export const NotificationProvider: React.FC = ({ children }) => {
  const { setInitialRoute, setNotificationLoaded } = useAppConfig();

  /**
   * When the application is running, but in the background.
   */
  const handleNotificationOpenedApp = useCallback(
    (navigationHook: NavigationProp<HomeStackParamList>): (() => void) => {
      const disposer = messaging().onNotificationOpenedApp((remoteMessage) => {
        try {
          const route = remoteMessage.data?.route as keyof HomeStackParamList;
          const params = remoteMessage.data?.params as any;

          navigationHook.navigate(route, params);
        } catch (error) {
          throw InvalidRouteException({ data: error, message: String(error) });
        }
      });

      return disposer;
    },
    []
  );

  /**
   * When the application is opened from a quit state.
   */
  const handleInitialNotification = useCallback(async () => {
    const initalNotf = await messaging().getInitialNotification();

    if (initalNotf) {
      try {
        if (initalNotf.data?.initialRoute !== null) {
          setInitialRoute(
            initalNotf.data?.initialRoute as keyof HomeStackParamList
          );
        }
      } catch (error) {
        throw InvalidRouteException({ data: error, message: String(error) });
      }
    }
  }, []);

  const handleMessageToken = useCallback(
    async (notificationService: NotificationService, userToken: string) => {
      const fcmToken = await messaging().getToken();
      await notificationService.storeFCMToken({ fcmToken, userToken });
    },
    []
  );

  const handleBackgroundMessage = useCallback(
    async (remoteMessage: FirebaseMessagingTypes.RemoteMessage) => {
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "You've got mail! 📬",
          body: "Here is the notification body",
          data: { data: "goes here" },
        },
        trigger: { seconds: 1 },
      });
      console.log({ remoteMessage });
    },
    []
  );

  const init = useCallback(async () => {
    const status = await messaging().requestPermission();
    // await handleInitialNotification();
    messaging().setBackgroundMessageHandler(handleBackgroundMessage);

    setNotificationLoaded(true);

    console.log({ status });
  }, []);

  useEffect(() => {
    init();
  }, []);

  return (
    <NotificationContext.Provider
      value={{ handleNotificationOpenedApp, handleMessageToken }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export function useNotification() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw ContextHookException({ hookName: "useNotification" });
  }

  return context;
}

export default NotificationContext;
