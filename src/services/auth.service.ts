import api from "./api";
import * as WebBrowser from "expo-web-browser";
import { Linking } from "react-native";
import { AxiosRequestException, NullException } from "../exceptions";
import Constants from "expo-constants";
import axios, { AxiosError, AxiosResponse } from "axios";
import getAxiosError from "../utils/get-axios-error";
import { getAuthorizationHeader } from "../utils/get-authorization-header";

export interface UpdateUserProps {
  username: string;
  profile: {
    name: string;
    description: string;
    birth: string;
  };
}

export interface LogoutUserProps {
  token: string;
}

class AuthService {
  async getUserTokenWithGoogle(): Promise<string | null> {
    let userToken: string | null = null;

    function handleTokenInUrl({ url }: { url: string }) {
      if (url.includes("token")) {
        const [_, tokenUrl] = url.split("?token=");

        const [token] = tokenUrl.split("&");

        userToken = token;
      }
    }

    // Wait to the Linking.addEventListener get the token
    async function holdForUrl() {
      await new Promise<string | null>((resolve, reject) => {
        let intervalCount = 0;
        const refreshIntervalId = setInterval(() => {
          intervalCount += 1;

          if (userToken || intervalCount > 3) {
            clearInterval(refreshIntervalId);
            resolve(userToken);
          }
        }, 300);
      });
    }

    try {
      WebBrowser.maybeCompleteAuthSession();

      Linking.addEventListener("url", handleTokenInUrl);

      await WebBrowser.openAuthSessionAsync(
        `${api.defaults.baseURL!}/google/redirect?appRedirectUri=${
          Constants.linkingUri
        }`,
        Constants.linkingUri
      );

      await holdForUrl();

      Linking.removeEventListener("url", handleTokenInUrl);

      return userToken;
    } catch (err) {
      console.log("ERROR - auth.service - getUserTokenWithGoogle");

      throw getAxiosError(err);
    }
  }

  async getUser(token: string): Promise<User | null> {
    try {
      const response = await api.get<User>("/google/user", {
        headers: {
          Authorization: "Bearer " + token,
        },
      });

      return response.data;
    } catch (err: AxiosError | unknown) {
      console.log("ERROR - auth.service - getUser");

      throw getAxiosError(err);
    }
  }

  async updateUser(
    token: string,
    data: UpdateUserProps
  ): Promise<UpdateUserProps | null> {
    try {
      const response = await api.patch<UpdateUserProps>("/users/me", data, {
        headers: getAuthorizationHeader(token),
      });

      return response.data;
    } catch (err: AxiosError | unknown) {
      console.log("ERROR - auth.service - updateUser");

      throw getAxiosError(err);
    }
  }

  async logoutUser({ token }: LogoutUserProps): Promise<AxiosResponse> {
    try {
      const response = await api.delete("/logout", {
        headers: getAuthorizationHeader(token),
      });

      return response;
    } catch (err: AxiosError | unknown) {
      console.log("ERROR - auth.service - logoutUser");

      throw getAxiosError(err);
    }
  }
}

export default new AuthService();
