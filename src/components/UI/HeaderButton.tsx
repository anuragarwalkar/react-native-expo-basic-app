import React, { FC } from 'react';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';
import { isAndroid } from '../../utils/utilityFunctions';
import Colors from '../../constants/Colors';

const CustomHeaderButton: FC<{}> = (props) => {
  return (
    <HeaderButton
      title="Shopping Cart"
      {...props}
      IconComponent={Ionicons}
      iconSize={22}
      color={isAndroid ? 'white' : Colors.primary}
    />
  );
};

export default CustomHeaderButton;
