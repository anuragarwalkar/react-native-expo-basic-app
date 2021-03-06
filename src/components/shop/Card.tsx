import React, { FC } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

const Card: FC<{ style?: ViewStyle }> = ({ style, children }) => {
  return <View style={{ ...styles.container, ...style }}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  container: {
    shadowColor: 'black',
    paddingBottom: 10,
    shadowOpacity: 0.26,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
  },
});
