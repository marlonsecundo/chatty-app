import React, { createContext, useCallback, useEffect, useState } from "react";
import { NullException } from "../errors";
import {
  getAsyncStorageData,
  storeAsyncStorageData,
} from "../services/async-storage.service";
import { getUser, getUserTokenWithGoogle } from "../services/auth.service";
interface AuthContextProps {
  token?: string;
  user?: User;
  signed: boolean;
  signUserWithGoogle: () => Promise<void>;
  checkIsLoggedIn: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User | null>();
  const [token, setToken] = useState<string | null>();

  const signUserWithGoogle = useCallback(async () => {
    try {
      const userToken = await getUserTokenWithGoogle();

      if (!userToken) throw NullException("signUserWithGoogle - Token Null");

      const loggedUser = await getUser(userToken);

      if (!loggedUser) throw NullException("signUserWithGoogle - User Null");

      setToken(userToken);
      setUser(loggedUser);

      await storeAsyncStorageData({ key: "@USER_TOKEN", value: userToken });
    } catch (error) {
      throw error;
    }
  }, []);

  const checkIsLoggedIn = useCallback(async (): Promise<boolean> => {
    try {
      const data = await getAsyncStorageData("@USER_TOKEN");

      if (!data?.value) throw NullException("signInWithToken - Token Null");

      const loggedUser = await getUser(data.value);

      if (!loggedUser) throw NullException("signUserWithGoogle - User Null");

      setToken(data.value);
      setUser(loggedUser);

      return true;
    } catch (error) {
      throw error;
    }
  }, []);

  const signed = !!user;

  return (
    <AuthContext.Provider
      value={{ signed, signUserWithGoogle, checkIsLoggedIn }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
