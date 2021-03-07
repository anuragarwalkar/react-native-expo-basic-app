import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { isAndroid } from '../../utils/utilityFunctions';
import CustomHeaderButton from './HeaderButton';
interface HeaderIconProps {
  onPress: () => void;
  name: string;
  title: string;
}
const CustomHeaderIcon: FC<HeaderIconProps> = ({ onPress, title, name }) => {
  return (
    <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
      <Item title={title} onPress={onPress} iconName={isAndroid ? `md-${name}` : `ios-${name}`} />
    </HeaderButtons>
  );
};

export default CustomHeaderIcon;

const styles = StyleSheet.create({});
