import axios, { AxiosInstance } from "axios";
import camelCaseKeys from "camelcase-keys";
import DotEnv from "../core/contants/dotenv";

class API {
  axiosApi!: AxiosInstance;

  init = async (envs: DotEnv) => {
    this.axiosApi = axios.create({
      baseURL: envs.API_URL,
    });

    this.axiosApi.interceptors.response.use(
      this.camelCaseResponseConverter,
      function (error: any) {
        return Promise.reject(error);
      }
    );
  };

  camelCaseResponseConverter = (response: any) => {
    const camelCaseData = camelCaseKeys(response.data, { deep: true });

    return { ...response, data: camelCaseData };
  };
}

export default API;
