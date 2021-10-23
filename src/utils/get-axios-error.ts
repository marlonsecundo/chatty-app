import axios from "axios";
import { AxiosRequestException } from "../exceptions";

export default function getAxiosError(err: any) {
  if (axios.isAxiosError(err)) {
    return AxiosRequestException({
      message: err.message,
      code: err.response?.status?.toString() ?? "",
      data: err,
    });
  }

  return err;
}
