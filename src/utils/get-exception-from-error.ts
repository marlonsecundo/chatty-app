import { Exception, EXCEPTION_TYPE, UnknowException } from "../exceptions";

export function getExceptionFromError(err: any): Exception {
  if (err.itype == EXCEPTION_TYPE) {
    return err as Exception;
  }

  return UnknowException({ message: String(err) });
}
