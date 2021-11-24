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
import authService, { UpdateUserProps } from "../services/auth.service";
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
}

const AuthContext = createContext<AuthContextProps>({} as AuthContextProps);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState<string>();

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

  const signed = !!user;

  return (
    <AuthContext.Provider
      value={{
        signed,
        signUserWithGoogle,
        checkIsLoggedIn,
        updateUser,
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
