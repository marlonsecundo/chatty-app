import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageException } from "../errors";

interface AsyncStorageData {
  key: "@USER_TOKEN";
  value: string;
}

export const storeAsyncStorageData = async (data: IAsyncStorageData) => {
  try {
    await AsyncStorage.setItem(data.key, data.value);
  } catch (e) {
    throw AsyncStorageException("error in store data", e);
  }
};

export const getAsyncStorageData = async (
  key: IAsyncStorageData["key"]
): Promise<IAsyncStorageData | null> => {
  try {
    const value = await AsyncStorage.getItem(key);

    if (value === null) {
      return null;
    }

    return { key, value: value };
  } catch (e) {
    throw AsyncStorageException("error in read data", e);
  }
};
