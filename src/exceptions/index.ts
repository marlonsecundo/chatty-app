export const EXCEPTION_TYPE = "EXCEPTION";

export interface Exception {
  itype?: "EXCEPTION";
  code?: string;
  message: string;
  name?: string;
  data?: any;
}

export function NullException(args: Exception): Exception {
  const name = "NullException";

  return { ...args, name };
}

export function AxiosRequestException(args: Exception): Exception {
  const name = "AxiosRequestException";

  return { ...args, name };
}

export function AsyncStorageException(args: Exception): Exception {
  const name = "AsyncStorageException";

  return { ...args, name };
}

export function UnknowException(args: Exception): Exception {
  const name = "UnknowException";

  return { ...args, name };
}

export function ContextHookException({
  hookName,
}: {
  hookName: string;
}): Exception {
  const name = "ContextException";

  return { name, message: hookName + "must be used within a Provider" };
}
