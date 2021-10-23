import axios from "axios";
import { API_URL } from "../core/contants/dotenv";
import camelCaseKeys from "camelcase-keys";

const api = axios.create({
  baseURL: API_URL,
});

export function camelCaseResponseConverter(response: any) {
  const camelCaseData = camelCaseKeys(response.data, { deep: true });

  return { ...response, data: camelCaseData };
}

api.interceptors.response.use(camelCaseResponseConverter, function (error) {
  return Promise.reject(error);
});

export default api;
