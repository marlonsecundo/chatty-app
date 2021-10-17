import React, { createContext, useCallback, useEffect, useState } from "react";
import { NullException } from "../errors";
import { getUser, getUserTokenWithGoogle } from "../services/auth.service";
interface IAuthContextProps {
  token?: string;
  user?: IUser;
  signed: boolean;
  signUserWithGoogle: () => Promise<void>;
}

const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps);

export const AuthProvider: React.FC = ({ children }) => {
  const [user, setUser] = useState<IUser | null>();
  const [token, setToken] = useState<string | null>();

  const signUserWithGoogle = useCallback(async () => {
    try {
      const userToken = await getUserTokenWithGoogle();

      if (!userToken) throw NullException("signUserWithGoogle - Token Null");

      const loggedUser = await getUser(userToken);

      if (!loggedUser) throw NullException("signUserWithGoogle - User Null");

      setToken(userToken);
      setUser(loggedUser);
    } catch (error) {
      throw error;
    }
  }, []);

  const signed = !!user;

  return (
    <AuthContext.Provider value={{ signed, signUserWithGoogle }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
