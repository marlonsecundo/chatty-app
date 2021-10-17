import React from "react";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FeedScreen from "../modules/home/screens/feed";

const Stack = createNativeStackNavigator();

function HomeStackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Feed"
        component={FeedScreen}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
}

export default HomeStackRoutes;
