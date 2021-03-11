import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import ShopNavigator from './ShopNavigator';

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <ShopNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;

const styles = StyleSheet.create({});
