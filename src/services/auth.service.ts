import { Linking } from "react-native";

import { AxiosRequestException, Exception, NullException } from "../exceptions";
import Constants from "expo-constants";
import axios, { AxiosError, AxiosResponse } from "axios";
import getAxiosError from "../utils/get-axios-error";
import { getAuthorizationHeader } from "../utils/get-authorization-header";
import API from "./api";
import BaseService from "./base-service";

export interface UpdateUserProps {
  username: string;
  profile: {
    name: string;
    description: string;
  };
}

export interface LogoutUserProps {
  token: string;
}

export interface CancelAccountProps {
  token: string;
}

class AuthService extends BaseService {
  async fetchUserTokenWithGoogle(
    onFetchToken: (tokenParam: string) => void
  ): Promise<void> {
    function handleTokenInUrl({ url }: { url: string }) {
      if (url.includes("token")) {
        const [_, tokenUrl] = url.split("?token=");

        const [token] = tokenUrl.split("&");

        Linking.removeEventListener("url", handleTokenInUrl);

        onFetchToken(token);
      }
    }

    try {
      Linking.removeEventListener("url", handleTokenInUrl);
      Linking.addEventListener("url", handleTokenInUrl);

      const appRedirectUrl = await Linking.getInitialURL();

      const url = `${this.axiosAPI.defaults
        .baseURL!}/google/redirect?appRedirectUri=${appRedirectUrl}`;

      const supported = await Linking.canOpenURL(url);

      if (!supported) {
        const ex: Exception = {
          message: "Link not suporterd",
          itype: "EXCEPTION",
        };

        throw ex;
      }

      await Linking.openURL(url);
    } catch (err) {
      throw getAxiosError(err);
    }
  }

  async getUser(token: string): Promise<User | null> {
    try {
      const response = await this.axiosAPI.get<User>("/google/user", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      return response.data;
    } catch (err: AxiosError | unknown) {
      throw getAxiosError(err);
    }
  }

  async updateUser(
    token: string,
    data: UpdateUserProps
  ): Promise<UpdateUserProps | null> {
    try {
      const response = await this.axiosAPI.patch<UpdateUserProps>(
        "/users/me",
        data,
        {
          headers: getAuthorizationHeader(token),
        }
      );

      return response.data;
    } catch (err: AxiosError | any) {
      throw getAxiosError(err);
    }
  }

  async logoutUser({ token }: LogoutUserProps): Promise<AxiosResponse> {
    try {
      const response = await this.axiosAPI.delete("/logout", {
        headers: getAuthorizationHeader(token),
      });

      return response;
    } catch (err: AxiosError | unknown) {
      throw getAxiosError(err);
    }
  }

  async cancelAccount({ token }: CancelAccountProps): Promise<AxiosResponse> {
    try {
      const response = await this.axiosAPI.delete("/users/me", {
        headers: getAuthorizationHeader(token),
      });

      return response;
    } catch (err: AxiosError | unknown) {
      throw getAxiosError(err);
    }
  }
}

export default AuthService;
