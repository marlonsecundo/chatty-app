import React from "react";

import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import FeedScreen from "../modules/home/screens/feed";
import ProfileScreen from "../modules/home/screens/profile";

export type HomeStackParamList = {
  Feed: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export type FeedScreenProps = NativeStackNavigationProp<
  HomeStackParamList,
  "Feed"
>;

function HomeStackRoutes() {
  return (
    <Stack.Navigator>
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
  );
}

export default HomeStackRoutes;
