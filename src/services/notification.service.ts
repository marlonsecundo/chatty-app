import { getAuthorizationHeader } from "../utils/get-authorization-header";
import getAxiosError from "../utils/get-axios-error";
import BaseService from "./base-service";

export interface StoreFCMTokenProps {
  userToken: string;
  fcmToken: string;
}

class NotificationService extends BaseService {
  async storeFCMToken({
    userToken,
    fcmToken,
  }: StoreFCMTokenProps): Promise<string | null> {
    try {
      const data = { fcmToken };
      const response = await this.axiosAPI.post("/users/me/token", data, {
        headers: getAuthorizationHeader(userToken),
      });

      return response.data as string;
    } catch (error) {
      throw getAxiosError(error);
    }
  }
}

export default NotificationService;
