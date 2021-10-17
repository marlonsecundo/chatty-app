import axios from "axios";
import { API_URL } from "../core/contants/dotenv";

const api = axios.create({
  baseURL: API_URL,
});

export default api;
