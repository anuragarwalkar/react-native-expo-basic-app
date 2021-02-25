import React, { FC } from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import colors from '../constants/colors';
import { Platform } from 'react-native';

interface CustomHeaderButtonProps {}
const CustomHeaderButton: FC<CustomHeaderButtonProps> = (props) => {
  return (
    <HeaderButton
      {...props}
      title="Favourite"
      IconComponent={Ionicons}
      iconSize={23}
      color={Platform.OS === 'android' ? 'white' : colors.primaryColor}
    />
  );
};

export default CustomHeaderButton;
