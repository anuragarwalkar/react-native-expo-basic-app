import { Platform } from 'react-native';

export const isAndroid = Platform.OS === 'android';

export const baseUrl = (path: string) => `https://shopping-app-cd1ae-default-rtdb.firebaseio.com${path}`;
