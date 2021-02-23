import React, { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';

export default function Card(props: { children: ReactNode; style?: any }) {
  return <View style={{ ...styles.card, ...props.style }}>{props.children}</View>;
}

const styles = StyleSheet.create({
  card: {
    padding: 20,
    width: 300,
    maxWidth: '100%',
    alignItems: 'center',
    shadowColor: 'black',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    backgroundColor: 'white',
    elevation: 5,
    borderRadius: 10,
  },
});
