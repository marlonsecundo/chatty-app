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
  FIREBASE_STORAGE_BUCKET = "";
  FIREBASE_KEY = "";
  FIREBASE_PROJECT_ID = "";
  FIREBASE_APP_ID = "";
  FIREBASE_PROJECT_NUMBER = "";
  FIREBASE_MEASUREMENT_ID = "";

  init = async () => {
    try {
      this.API_URL = process.env.API_URL!;

      this.FIREBASE_STORAGE_BUCKET = process.env.FIREBASE_STORAGE_BUCKET!;
      this.FIREBASE_KEY = process.env.FIREBASE_KEY!;
      this.FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID!;
      this.FIREBASE_APP_ID = process.env.FIREBASE_APP_ID!;
      this.FIREBASE_PROJECT_NUMBER = process.env.FIREBASE_PROJECT_NUMBER!;
      this.FIREBASE_MEASUREMENT_ID = process.env.FIREBASE_MEASUREMENT_ID!;
    } catch (err) {
      throw getExceptionFromError(err);
    }
  };
}

export default DotEnv;
