import React from 'react';
import { Text, View } from 'react-native';
import colors from '../constants/colors';
import defaultStyle from '../constants/defaultStyle';

export default function Header(props: { title: string }) {
  return (
    <View style={{ ...styles.header, ...styles.defaultText }}>
      <Text style={styles.headerTitle}>{props.title}</Text>
    </View>
  );
}

const styles = defaultStyle({
  header: {
    width: '100%',
    height: 90,
    paddingTop: 36,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 18,
  },
});
