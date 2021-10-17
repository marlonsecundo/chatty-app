interface IException {
  code?: string;
  message: string;
  name: string;
  data?: any;
}

export function NullException(message: string, data?: any): IException {
  const name = "NullException";

  return { message, name, data };
}

export function AxiosRequestException(
  message: string,
  code: string,
  data?: any
): IException {
  const name = "AxiosRequestException";

  return { message, name, code, data };
}
