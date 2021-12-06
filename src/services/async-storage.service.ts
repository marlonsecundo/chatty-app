import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageException } from "../exceptions";

interface AsyncStorageData {
  key: "@USER_TOKEN";
  value: string;
}

class AsyncStorageService {
  storeAsyncStorageData = async (data: AsyncStorageData) => {
    try {
      await AsyncStorage.setItem(data.key, data.value);
    } catch (e) {
      throw AsyncStorageException({ message: "error in store data", data: e });
    }
  };

  getAsyncStorageData = async (
    key: AsyncStorageData["key"]
  ): Promise<AsyncStorageData | null> => {
    try {
      const value = await AsyncStorage.getItem(key);

      if (value === null) {
        return null;
      }

      return { key, value: value };
    } catch (e) {
      throw AsyncStorageException({ message: "error in read data", data: e });
    }
  };

  removeAsyncStorageData = async (
    key: AsyncStorageData["key"]
  ): Promise<boolean> => {
    try {
      await AsyncStorage.removeItem(key);

      return true;
    } catch (e) {
      throw AsyncStorageException({ message: "error in read data", data: e });
    }
  };
}

export default new AsyncStorageService();
