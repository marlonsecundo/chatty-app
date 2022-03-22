import { NavigationContainer } from "@react-navigation/native";
import AuthContext from "@/src/contexts/auth-context";
import React, { useContext } from "react";
import AuthStackRoutes, { AuthStackParamList } from "./auth.routes";
import HomeStackRoutes, { HomeStackParamList } from "./home.routes";
import { darkTheme } from "../styles/theme";

export interface RouteProps {
  initialRoute?: keyof HomeStackParamList;
}

const Routes: React.FC<RouteProps> = ({ initialRoute }) => {
  const { signed } = useContext(AuthContext);

  const stackRoutes = signed ? (
    <HomeStackRoutes initialRoute={initialRoute} />
  ) : (
    <AuthStackRoutes />
  );

  return (
    <NavigationContainer theme={darkTheme}>{stackRoutes}</NavigationContainer>
  );
};

export default Routes;
