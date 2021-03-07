import React from 'react';
import { StyleSheet } from 'react-native';
import PlacesNavigator from './src/navigation/PlacesNavigator';

export default function App() {
  return <PlacesNavigator />;
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
