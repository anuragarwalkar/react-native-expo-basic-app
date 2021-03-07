import { Platform } from 'react-native';
import RootState from '../models/redux/RootState.model';

export const isAndroid = Platform.OS === 'android';

export const selectPlaces = ({ places: { places: rPlaces } }: RootState) => rPlaces;
