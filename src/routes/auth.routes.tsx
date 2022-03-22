import React, { useContext, useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../modules/auth/screens/signin";
import AuthContext from "../contexts/auth-context";
import LoadingScreen from "../modules/auth/screens/loading";

export type AuthStackParamList = {
  Loading: undefined;
  SignIn: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

function AuthStackRoutes() {
  const [loading, setLoading] = useState(true);

  const { checkIsLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    checkIsLoggedIn().catch(() => {
      setLoading(false);
    });
  }, []);

  const stack = loading ? (
    <Stack.Navigator>
      <Stack.Screen
        name="Loading"
        component={LoadingScreen}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  ) : (
    <Stack.Navigator>
      <Stack.Screen
        name="SignIn"
        component={SignInScreen}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );

  return stack;
}

export default AuthStackRoutes;
