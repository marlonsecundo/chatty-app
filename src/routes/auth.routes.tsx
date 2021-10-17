import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../modules/auth/screens/signin";

const Stack = createNativeStackNavigator();

function AuthStackRoutes() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
}

export default AuthStackRoutes;
