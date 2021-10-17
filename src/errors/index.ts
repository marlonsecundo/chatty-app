interface IException {
  message: string;
  name: string;
  stack?: any;
}

export function NullException(message: string, stack?: any): IException {
  const name = "NullException";

  return { message, name, stack };
}

export function AxiosRequestException(
  message: string,
  stack?: any
): IException {
  const name = "AxiosRequestException";

  return { message, name, stack };
}
