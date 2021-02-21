import React, { ReactNode } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../constants/colors';

export default function NumberContainer(props: { children: ReactNode }) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{props.children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: colors.secondary,
    padding: 10,
    width: 50,
    borderRadius: 10,
    marginVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: colors.secondary,
    fontSize: 20,
  },
});
