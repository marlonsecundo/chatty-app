import { getAuthorizationHeader } from "../utils/get-authorization-header";
import getAxiosError from "../utils/get-axios-error";
import api from "./api";

interface ShowUserProps {
  token: string;
  userId: string;
}

class UserService {
  async showUser({ token, userId }: ShowUserProps): Promise<User | null> {
    try {
      const response = await api.get(`/users/${userId}`, {
        headers: getAuthorizationHeader(token),
      });

      return response.data as User;
    } catch (error) {
      console.log("ERROR - user.service - showUser");
      throw getAxiosError(error);
    }
  }
}

export default new UserService();
