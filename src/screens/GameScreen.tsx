import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Alert } from 'react-native';
import Card from '../components/Card';
import NumberContainer from '../components/NumberContainer';

type GuessButtonModel = 'LOWER' | 'GREATER';

const GUESS = {
  LOWER: 'LOWER' as GuessButtonModel,
  GREATER: 'GREATER' as GuessButtonModel,
};

const generateRandomBetween = (min: number, max: number, exclude: number): number => {
  min = Math.ceil(min);
  max = Math.ceil(max);

  const rndNumber = Math.floor(Math.random() * (max - min)) + min;

  if (rndNumber === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rndNumber;
  }
};

export default function GameScreen(props: { userChoise: number; onGameOver: (numberOfRounds: number) => void }) {
  const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoise));

  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const [rounds, setRounds] = useState(0);

  useEffect(() => {
    if (currentGuess === props.userChoise) {
      props.onGameOver(rounds);
    }
  });

  const nextGuessHandler = (direction: GuessButtonModel) => {
    if (
      (direction === GUESS.LOWER && currentGuess < props.userChoise) ||
      (direction === GUESS.GREATER && currentGuess > props.userChoise)
    ) {
      Alert.alert("Don't lie!", 'You know that this is wrong...', [{ text: 'Sorry', style: 'cancel' }]);
      return;
    }

    if (direction === GUESS.LOWER) {
      currentHigh.current = currentGuess;
    } else {
      currentLow.current = currentGuess;
    }

    const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess);

    setCurrentGuess(nextNumber);
    setRounds((oldState) => oldState + 1);
  };

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button title={GUESS.LOWER} onPress={() => nextGuessHandler(GUESS.LOWER)} />
        </View>
        <View style={styles.button}>
          <Button title={GUESS.GREATER} onPress={() => nextGuessHandler(GUESS.GREATER)} />
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20,
    width: 300,
    maxWidth: '70%',
  },
  button: {
    width: 100,
  },
});
