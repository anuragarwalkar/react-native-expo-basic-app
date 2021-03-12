import AsyncStorage from '@react-native-async-storage/async-storage';
import { askAsync, getAsync, PermissionType } from 'expo-permissions';
import { Platform } from 'react-native';
import { AuthState } from '../store/reducers/auth.reducer';

export const getExpiresIn = (time: number | string): number => {
  const expiresInMs = typeof time === 'number' ? time : parseInt(time);
  return new Date().getTime() + expiresInMs * 1000;
};

export const getExpiresInDate = (time: number | string): Date => {
  return new Date(getExpiresIn(time));
};

export const deviceStorage = () => {
  const userDataKey = 'userData';
  return {
    setUser: (userData: { userId: string; token: string }) => {
      AsyncStorage.setItem(userDataKey, JSON.stringify(userData));
    },

    getUser: async (): Promise<AuthState | null> => {
      const savedUserData = await AsyncStorage.getItem(userDataKey);

      if (savedUserData) {
        return JSON.parse(savedUserData);
      } else {
        return null;
      }
    },
    clearUser: async () => {
      return await AsyncStorage.removeItem(userDataKey);
    },
  };
};

export const isAndroid = Platform.OS === 'android';

export const baseUrl = (path: string, token: string) =>
  `https://shopping-app-cd1ae-default-rtdb.firebaseio.com${path}?auth=${token}`;

export const getPermissions = (permissionType: PermissionType) => {
  return getAsync(permissionType)
    .then((permission) => {
      if (permission.status !== 'granted') {
        return askAsync(permissionType);
      } else {
        return permission;
      }
    })
    .then((permission) => {
      if (permission.status !== 'granted') {
        return false;
      } else {
        return true;
      }
    });
};

export const sendNotificationByToken = async (
  token: string,
  { title, message }: { title: string; message: string }
) => {
  try {
    await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-Encoding': 'gzip, deflate',
        'content-Type': 'application/json',
      },
      body: JSON.stringify({
        to: token,
        title,
        body: message,
      }),
    });

    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};
