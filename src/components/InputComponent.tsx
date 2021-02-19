import React from 'react';
import { View, StyleSheet, TextInput } from 'react-native';
import { Styles } from '../models/styles.model';

export default function InputComponent(props: { style?: Styles } | any) {
  return (
    <View>
      <TextInput {...props} style={{ ...styles.input, ...props.style }} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});
