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
    (navigator: NavigationProp<HomeStackParamList>): (() => void) => {
      const disposer = messaging().onNotificationOpenedApp((remoteMessage) => {
        try {
          const data = remoteMessage.data as BaseMessageData;

          navigateByMessage(navigator, data);
        } catch (error) {
          throw error;
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
    const remoteMessage = await messaging().getInitialNotification();

    if (remoteMessage) {
      try {
        const baseData = remoteMessage.data as BaseMessageData;

        if (baseData.itype === "new:postLike") {
          const newLikeData = baseData as NewPostLikeMessageData;

          if (newLikeData.route !== null) {
            setInitialRoute(newLikeData.route as keyof HomeStackParamList);
          }
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

  const navigateByMessage = useCallback(
    (
      navigator: NavigationProp<HomeStackParamList>,
      messageData: BaseMessageData
    ) => {
      if (messageData.itype == "new:postLike") {
        const newLike = messageData as NewPostLikeMessageData;

        const route = newLike.route as keyof HomeStackParamList;
        const params = { postId: newLike.postId };

        navigator.navigate(route, params);
      }
    },
    []
  );

  const init = useCallback(async () => {
    const status = await messaging().requestPermission();
    await handleInitialNotification();
    messaging().setBackgroundMessageHandler(async () => {});

    setNotificationLoaded(true);
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
