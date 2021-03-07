import { Ionicons } from '@expo/vector-icons';
import React, { FC } from 'react';
import { StyleSheet } from 'react-native';
import { NavigationProp } from 'react-navigation';
import { HeaderButton } from 'react-navigation-header-buttons';
import appColors from '../../constants/appColors';
import { isAndroid } from '../../utils/utilityFunctions';

type HeaderButtonProps = {
  navigation: NavigationProp<{}>;
  title: string;
};

const CustomHeaderButton: FC<HeaderButtonProps> = (props: HeaderButtonProps) => {
  return (
    <HeaderButton {...props} IconComponent={Ionicons} iconSize={23} color={isAndroid ? 'white' : appColors.primary} />
  );
};

export default CustomHeaderButton;

const styles = StyleSheet.create({});
