import axios, { AxiosError } from "axios";
import { AxiosRequestException } from "../exceptions";

export default function getAxiosError(err: any) {
  if (axios.isAxiosError(err)) {
    const axiosError = err as AxiosError;

    return AxiosRequestException({
      message: axiosError.toString(),
      code: axiosError.response?.status?.toString() ?? "",
      data: axiosError,
    });
  }

  return err;
}
