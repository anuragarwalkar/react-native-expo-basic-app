import { StyleSheet } from 'react-native';
import { Styles } from '../models/styles.model';
import { OPEN_SANS_BOLD } from './fonts';

type NamedStyles<T> = { [P in keyof T]: Styles };

export default <T extends NamedStyles<T> | NamedStyles<any>>(styles: T | NamedStyles<T>) => {
  const defaultStyleSheet = {
    defaultText: {
      fontFamily: OPEN_SANS_BOLD,
    },
    ...styles,
  };

  return StyleSheet.create(defaultStyleSheet);
};
