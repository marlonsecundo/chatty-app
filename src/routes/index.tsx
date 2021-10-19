import { NavigationContainer } from "@react-navigation/native";
import AuthContext from "@/src/contexts/auth-context";
import React, { useContext } from "react";
import AuthStackRoutes from "./auth.routes";
import HomeStackRoutes from "./home.routes";
import { darkTheme } from "../styles/theme";

const Routes: React.FC = () => {
  const { signed } = useContext(AuthContext);

  const stackRoutes = true ? <HomeStackRoutes /> : <AuthStackRoutes />;

  return (
    <NavigationContainer theme={darkTheme}>{stackRoutes}</NavigationContainer>
  );
};

export default Routes;
