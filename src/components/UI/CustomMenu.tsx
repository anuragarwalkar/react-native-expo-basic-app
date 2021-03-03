import React, { FC } from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { isAndroid } from '../../utils/utilityFunctions';
import CustomHeaderButton from './HeaderButton';

const CustomMenu: FC<{ onPress: () => void; icon: string; title: string }> = ({ onPress, title, icon }) => (
  <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
    <Item title={title} iconName={isAndroid ? `md-${icon}` : `ios-${icon}`} onPress={onPress}></Item>
  </HeaderButtons>
);

export default CustomMenu;
