import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import { AxiosRequestException, NullException } from "../exceptions";
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

WebBrowser.maybeCompleteAuthSession();

class AuthService extends BaseService {
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
      Linking.addEventListener("url", handleTokenInUrl);

      const appRedirectUrl = Linking.createURL("");

      const url = `${this.axiosAPI.defaults
        .baseURL!}/google/redirect?appRedirectUri=${appRedirectUrl}`;

      await WebBrowser.openAuthSessionAsync(url, appRedirectUrl);

      await holdForUrl();

      Linking.removeEventListener("url", handleTokenInUrl);

      return userToken;
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
    } catch (err: AxiosError | unknown) {
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
