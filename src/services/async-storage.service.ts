import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageException } from "../exceptions";

interface AsyncStorageData {
  key: "@USER_TOKEN";
  value: string;
}

export const storeAsyncStorageData = async (data: AsyncStorageData) => {
  try {
    await AsyncStorage.setItem(data.key, data.value);
  } catch (e) {
    throw AsyncStorageException({ message: "error in store data", data: e });
  }
};

export const getAsyncStorageData = async (
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
