import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ContextHookException, NullException } from "../exceptions";
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
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>();

  const signUserWithGoogle = useCallback(async () => {
    try {
      const userToken = await getUserTokenWithGoogle();

      if (!userToken)
        throw NullException({ message: "signUserWithGoogle - Token Null" });

      const loggedUser = await getUser(userToken);

      if (!loggedUser)
        throw NullException({ message: "signUserWithGoogle - User Null" });

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

      if (!data?.value)
        throw NullException({ message: "signInWithToken - Token Null" });

      const loggedUser = await getUser(data.value);

      if (!loggedUser)
        throw NullException({ message: "signUserWithGoogle - User Null" });

      console.log({ loggedUser });

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
      value={{ signed, signUserWithGoogle, checkIsLoggedIn, token, user }}
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
