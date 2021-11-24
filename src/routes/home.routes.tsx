import React from "react";

import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import FeedScreen from "../modules/home/screens/feed";
import ProfileScreen from "../modules/home/screens/profile";
import { View } from "react-native";
import styled from "styled-components/native";

export type HomeStackParamList = {
  Feed: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export type FeedScreenProps = NativeStackNavigationProp<
  HomeStackParamList,
  "Feed"
>;

const BackgroundRootView = styled.View`
  background-color: ${({ theme }) => theme.colors.background};
  flex: 1;
`;

function HomeStackRoutes() {
  return (
    <BackgroundRootView>
      <Stack.Navigator defaultScreenOptions={{}}>
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
