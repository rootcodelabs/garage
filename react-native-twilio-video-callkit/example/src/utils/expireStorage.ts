import AsyncStorage from '@react-native-async-storage/async-storage';

const setItem = async (key: string, value: any, expireInSecond: number) => {
  try {
    const expireDate = createExpiredDate(expireInSecond);
    const saveData = {
      saveTime: new Date(),
      expireDate,
      value,
    };
    return await AsyncStorage.setItem(key, JSON.stringify(saveData));
  } catch (e) {
    return e;
  }
};

const getItem = async (key: string) => {
  try {
    if (!key) {
      return null;
    }
    const result = await AsyncStorage.getItem(key);
    return checkCacheData(key, result);
  } catch (e) {
    return null;
  }
};

const removeItem = async (key: string) => {
  try {
    return await AsyncStorage.removeItem(key);
  } catch (e) {
    return null;
  }
};

function checkCacheData(key: string, result: any) {
  if (!result) {
    return null;
  }

  try {
    const data = JSON.parse(result);
    if (checkExpireDate(data.expireDate)) {
      removeItem(key);
      return null;
    }
    return data.value;
  } catch (e) {
    return null;
  }
}

function checkExpireDate(expireDate: string) {
  if (!expireDate) {
    return false;
  }

  const currentTime = new Date().getTime(),
    expiredTime = new Date(expireDate).getTime();

  return expiredTime < currentTime;
}

function createExpiredDate(expire: number) {
  // if expire is 0 or undefined or null, return null
  if (!expire) {
    return null;
  }

  const seconds = expire * 1000, // transfer second to millisecond
    expiredTime = new Date().getTime() + seconds;

  return new Date(expiredTime);
}

export const expireStorage = {
  setItem,
  getItem,
  removeItem,
};
