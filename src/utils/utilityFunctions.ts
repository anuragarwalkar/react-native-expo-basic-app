import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { AuthState } from '../store/reducers/auth.reducer';

export const getExpiresIn = (time: number | string): number => {
  const expiresInMs = new Date().getTime() + (typeof time === 'number' ? time : parseInt(time));
  return expiresInMs * 1000;
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
  };
};

export const isAndroid = Platform.OS === 'android';

export const baseUrl = (path: string, token: string) =>
  `https://shopping-app-cd1ae-default-rtdb.firebaseio.com${path}?auth=${token}`;
