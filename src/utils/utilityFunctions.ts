import { Dimensions, Platform, StyleSheet } from 'react-native';
import { OPEN_SANS, OPEN_SANS_BOLD } from '../constants/fonts';

export const isAndroid = (): boolean => {
  return Platform.OS === 'android';
};

export const defaultTextStyle = StyleSheet.create({
  text: {
    fontFamily: OPEN_SANS,
  },
});

export const boldTextStyle = StyleSheet.create({
  text: {
    fontFamily: OPEN_SANS_BOLD,
  },
});

export const deviceWidth = Dimensions.get('window').height;
