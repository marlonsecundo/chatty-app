import { Axios, AxiosResponse } from "axios";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { STATUS_OK } from "../core/contants/axios-response-status";
import { ContextHookException, NullException } from "../exceptions";

import authService, {
  CancelAccountProps,
  LogoutUserProps,
  UpdateUserProps,
} from "../services/auth.service";
import ServiceManager from "../services/service-manager";
import { useService } from "./service-context";
interface AuthContextProps {
  token?: string;
  user?: User;
  signed: boolean;
  signUserWithGoogle: () => Promise<void>;
  checkIsLoggedIn: () => Promise<boolean>;
  updateUser: (
    token: string,
    data: UpdateUserProps
  ) => Promise<UpdateUserProps>;
  logoutUser: (args: LogoutUserProps) => Promise<AxiosResponse>;
  cancelAccount: (args: CancelAccountProps) => Promise<AxiosResponse>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>();
  const { serviceManager } = useService();

  const { asyncStorageService, authService } = serviceManager;

  const clearUserLocalData = useCallback(async () => {
    setToken(undefined);
    setUser(undefined);
    await asyncStorageService.removeAsyncStorageData("@USER_TOKEN");
  }, []);

  const signUserWithGoogle = useCallback(async () => {
    try {
      const userToken = await authService.getUserTokenWithGoogle();

      if (!userToken)
        throw NullException({ message: "signUserWithGoogle - Token Null" });

      const loggedUser = await authService.getUser(userToken);

      if (!loggedUser)
        throw NullException({ message: "signUserWithGoogle - User Null" });

      setToken(userToken);
      setUser(loggedUser);

      await asyncStorageService.storeAsyncStorageData({
        key: "@USER_TOKEN",
        value: userToken,
      });
    } catch (error) {
      throw error;
    }
  }, []);

  const checkIsLoggedIn = useCallback(async (): Promise<boolean> => {
    try {
      const data = await asyncStorageService.getAsyncStorageData("@USER_TOKEN");

      if (!data?.value)
        throw NullException({ message: "signInWithToken - Token Null" });

      const loggedUser = await authService.getUser(data.value);

      if (!loggedUser)
        throw NullException({ message: "signUserWithGoogle - User Null" });

      setToken(data.value);
      setUser(loggedUser);

      return true;
    } catch (error) {
      throw error;
    }
  }, []);

  const updateUser = useCallback(
    async (token: string, data: UpdateUserProps): Promise<UpdateUserProps> => {
      try {
        const updatedData = await authService.updateUser(token, data);

        if (!updatedData)
          throw NullException({ message: "updateUser - updatedData Null" });

        setUser({
          ...user,
          username: updatedData.username,
          profile: { ...user?.profile, ...updatedData.profile },
        });

        return updatedData;
      } catch (error) {
        throw error;
      }
    },
    [user]
  );

  const logoutUser = useCallback(
    async (args: LogoutUserProps): Promise<AxiosResponse> => {
      try {
        const response = await authService.logoutUser(args);

        if (response?.status === STATUS_OK) {
          clearUserLocalData();
        }

        return response;
      } catch (error) {
        throw error;
      }
    },
    []
  );

  const cancelAccount = useCallback(
    async (args: CancelAccountProps): Promise<AxiosResponse> => {
      try {
        const response = await authService.cancelAccount(args);

        await clearUserLocalData();

        return response;
      } catch (error) {
        throw error;
      }
    },
    []
  );

  const signed = !!user;

  return (
    <AuthContext.Provider
      value={{
        signed,
        signUserWithGoogle,
        checkIsLoggedIn,
        updateUser,
        logoutUser,
        cancelAccount,
        token,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw ContextHookException({ hookName: "useAuth" });
  }

  return context;
}

export default AuthContext;
