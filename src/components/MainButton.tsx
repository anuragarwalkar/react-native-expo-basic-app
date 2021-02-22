import React, { FC } from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';
import defaultStyle from '../constants/defaultStyle';

interface MainButtonProps {
  onPress: () => void;
  color?: string;
}

const MainButton: FC<MainButtonProps> = (props) => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={{ ...styles.button, backgroundColor: props.color ? props.color : colors.primary }}>
        <Text style={{ ...styles.buttonText }}> {props.children}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = defaultStyle({
  button: {
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 18,
  },
});

export default MainButton;
