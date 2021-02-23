import React from 'react';
import { Text, View, Platform } from 'react-native';
import colors from '../constants/colors';
import defaultStyle from '../constants/defaultStyle';

export default function Header(props: { title: string }) {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitleText}>{props.title}</Text>
    </View>
  );
}

const styles = defaultStyle({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    backgroundColor: Platform.OS === 'android' ? colors.primary : colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleText: {
    color: 'white',
    fontSize: 18,
  },
});
