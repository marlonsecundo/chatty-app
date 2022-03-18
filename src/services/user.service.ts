import { getAuthorizationHeader } from "../utils/get-authorization-header";
import getAxiosError from "../utils/get-axios-error";
import api from "./api";
import BaseService from "./base-service";

interface ShowUserProps {
  token: string;
  userId: string;
}

class UserService extends BaseService {
  async showUser({ token, userId }: ShowUserProps): Promise<User | null> {
    try {
      const response = await this.axiosAPI.get(`/users/${userId}`, {
        headers: getAuthorizationHeader(token),
      });

      return response.data as User;
    } catch (error) {
      console.log("ERROR - user.service - showUser");
      throw getAxiosError(error);
    }
  }
}

export default UserService;
