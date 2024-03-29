export const EXCEPTION_TYPE = "EXCEPTION";

interface APIResponseError {
  rule: string;
  field: string;
  message: string;
}
export interface Exception {
  itype?: "EXCEPTION";
  code?: string;
  message: string;
  name?: string;
  data?: any;
  errors?: APIResponseError[];
}

export function NullException(args: Exception): Exception {
  const name = "NullException";

  return { ...args, name, itype: "EXCEPTION" };
}

export function AxiosRequestException(args: Exception): Exception {
  const name = "AxiosRequestException";

  return { ...args, name, itype: "EXCEPTION" };
}

export function AsyncStorageException(args: Exception): Exception {
  const name = "AsyncStorageException";

  return { ...args, name, itype: "EXCEPTION" };
}

export function UnknowException(args: Exception): Exception {
  const name = "UnknowException";

  return { ...args, name, itype: "EXCEPTION" };
}

export function InvalidRouteException(args: Exception): Exception {
  const name = "InvalidRouteException";

  return { ...args, name, itype: "EXCEPTION" };
}

export function ContextHookException({
  hookName,
}: {
  hookName: string;
}): Exception {
  const name = "ContextException";

  return {
    name,
    message: hookName + "must be used within a Provider",
    itype: "EXCEPTION",
  };
}
