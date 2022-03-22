import { getExceptionFromError } from "@/src/utils/get-exception-from-error";

class DotEnv {
  private static _instance: DotEnv;

  private constructor() {}

  public static getI(): DotEnv {
    if (!this._instance) {
      this._instance = new DotEnv();
    }

    return this._instance;
  }

  API_URL = "";

  init = async () => {
    try {
      this.API_URL = process.env.API_URL!;
    } catch (err) {
      throw getExceptionFromError(err);
    }
  };
}

export default DotEnv;
