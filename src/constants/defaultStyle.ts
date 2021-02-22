import { StyleSheet } from 'react-native';
import { Styles } from '../models/styles.model';
import { OPEN_SANS, OPEN_SANS_BOLD } from './fonts';

type NamedStyles<T> = { [P in keyof T]: Styles };

export default <T extends NamedStyles<T> | NamedStyles<any>>(styles: T | NamedStyles<T>) => {
  for (let style in styles) {
    if (style.toLowerCase().includes('text')) {
      styles[style] = {
        ...styles[style],
        fontFamily: OPEN_SANS,
      };
    } else if (style.toLowerCase().includes('titletext')) {
      styles[style] = {
        ...styles[style],
        fontFamily: OPEN_SANS_BOLD,
      };
    }
  }
  const defaultStyleSheet = {
    defaultText: {
      fontFamily: OPEN_SANS,
    },
    boldText: {
      fontFamily: OPEN_SANS_BOLD,
    },
    ...styles,
  };

  return StyleSheet.create(defaultStyleSheet);
};
