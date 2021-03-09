import { askAsync, PermissionType } from 'expo-permissions';
import { Alert, Platform } from 'react-native';
import RootState from '../models/redux/RootState.model';

export const isAndroid = Platform.OS === 'android';

export const selectPlaces = ({ places: { places: rPlaces } }: RootState) => rPlaces;

export const verifyPermissions = async (...args: PermissionType[]) => {
  const result = await askAsync(...args);
  if (result.status !== 'granted') {
    Alert.alert('Insufficient Permissions', 'You need to grant camera permissions', [{ text: 'Okay' }]);
    return false;
  }
  return true;
};
