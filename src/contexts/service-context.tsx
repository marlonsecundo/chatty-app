import React, { createContext, useContext } from "react";
import { ContextHookException } from "../exceptions";

import ServiceManager from "../services/service-manager";

interface ContextProps {
  serviceManager: ServiceManager;
}

interface ProviderProps {
  serviceManager: ServiceManager;
}

const ServiceContext = createContext<ContextProps>({} as ContextProps);

export const ServiceProvider: React.FC<ProviderProps> = ({
  children,
  serviceManager,
}) => {
  return (
    <ServiceContext.Provider value={{ serviceManager }}>
      {children}
    </ServiceContext.Provider>
  );
};

export function useService() {
  const context = useContext(ServiceContext);

  if (!context) {
    throw ContextHookException({ hookName: "useService" });
  }

  return context;
}
