import { NavigationContainer } from "@react-navigation/native";
import AuthContext from "@/src/contexts/auth-context";
import React, { useContext } from "react";
import AuthStackRoutes from "./auth.routes";
import HomeStackRoutes from "./home.routes";

const Routes: React.FC = () => {
  const { signed } = useContext(AuthContext);

  const stackRoutes = signed ? <HomeStackRoutes /> : <AuthStackRoutes />;

  return <NavigationContainer>{stackRoutes}</NavigationContainer>;
};

export default Routes;
