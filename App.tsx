import React from 'react';
import { StyleSheet, View } from 'react-native';
import HeaderComponent from './src/components/HeaderComponent';
import StartGameScreen from './src/screens/StartGameScreen';

export default function App() {
  return (
    <View style={styles.container}>
      <HeaderComponent title="Guess a Number" />
      <StartGameScreen />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
