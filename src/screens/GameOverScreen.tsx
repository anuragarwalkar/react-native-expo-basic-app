import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import colors from '../constants/colors';

export default function GameOverScreen(props: { numberOfRounds: number; userNumber: number; resetGame: () => void }) {
  return (
    <View style={styles.screen}>
      <Text style={styles.text}>The Game is Over!</Text>
      <Text style={styles.subText}>Number of rounds: {props.numberOfRounds}</Text>
      <Text style={styles.subText}>Number was: {props.userNumber}</Text>
      <View style={styles.button}>
        <Button color={colors.secondary} title="NEW GAME" onPress={props.resetGame} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 30,
  },
  subText: {
    fontSize: 20,
  },
  button: {
    marginTop: 10,
    width: 100,
  },
});
