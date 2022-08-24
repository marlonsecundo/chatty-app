import { NavigationContainer } from "@react-navigation/native";
import AuthContext from "@/src/contexts/auth-context";
import React, { useContext } from "react";
import AuthStackRoutes, { AuthStackParamList } from "./auth.routes";
import HomeStackRoutes, { HomeStackParamList } from "./home.routes";
import { darkTheme } from "../styles/theme";

const Routes: React.FC = () => {
  const { signed } = useContext(AuthContext);

  const stackRoutes = signed ? <HomeStackRoutes /> : <AuthStackRoutes />;

  return (
    <NavigationContainer theme={darkTheme}>{stackRoutes}</NavigationContainer>
  );
};

export default Routes;
