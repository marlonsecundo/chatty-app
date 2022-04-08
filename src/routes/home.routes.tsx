import React, { useEffect } from "react";

import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import FeedScreen, { FeedScreenProps } from "../modules/home/screens/feed";
import ProfileScreen, {
  ProfileScreenProps,
} from "../modules/home/screens/profile";
import { View } from "react-native";
import styled from "styled-components/native";
import { useNotification } from "../contexts/notification-context";
import { useNavigation } from "@react-navigation/native";
import { useService } from "../contexts/service-context";
import { useAuth } from "../contexts/auth-context";
import { useAppConfig } from "../contexts/app-config-context";

export type HomeStackParamList = {
  Feed?: FeedScreenProps;
  Profile?: ProfileScreenProps;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export type HomeStackNavProps = NativeStackNavigationProp<HomeStackParamList>;

const BackgroundRootView = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

function HomeStackRoutes() {
  const { handleNotificationOpenedApp, handleMessageToken } = useNotification();
  const { initialRoute } = useAppConfig();
  const { token } = useAuth();
  const { serviceManager } = useService();
  const { notificationService } = serviceManager;

  const navigation = useNavigation<HomeStackNavProps>();

  useEffect(() => {
    const disposer = handleNotificationOpenedApp(navigation);
    handleMessageToken(notificationService, token ?? "");
    return disposer;
  }, []);

  return (
    <BackgroundRootView>
      <Stack.Navigator
        initialRouteName={initialRoute}
        defaultScreenOptions={{}}
      >
        <Stack.Screen
          name="Feed"
          component={FeedScreen}
          options={{ header: () => null }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{ header: () => null }}
        />
      </Stack.Navigator>
    </BackgroundRootView>
  );
}

export default HomeStackRoutes;
