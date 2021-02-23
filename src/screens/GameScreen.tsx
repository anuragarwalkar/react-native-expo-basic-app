import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import Card from '../components/Card';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';
import { deviceHeight, deviceWidth, getDimensions } from '../utils/utilFunctions';
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

interface GameScreenProps {
  userChoise: number;
  onGameOver: (numberOfRounds: number) => void;
}

const initialWidth = (_initialWidth: number) => (_initialWidth > 400 ? _initialWidth / 4 : _initialWidth / 3.5);

export default function GameScreen(props: GameScreenProps) {
  const [currentGuess, setCurrentGuess] = useState(generateRandomBetween(1, 100, props.userChoise));
  const [buttonWidth, setButtonWidth] = useState(initialWidth(deviceWidth));
  const currentLow = useRef(1);
  const currentHigh = useRef(100);
  const [rounds, setRounds] = useState(0);

  let removeDimentionListner: () => void;

  const updateDimensions = (width: number) => {
    setButtonWidth(initialWidth(width));
  };

  useEffect(() => {
    removeDimentionListner = getDimensions(updateDimensions);
    return () => {
      removeDimentionListner();
    };
  });

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

  const buttonWidthStyle = { width: buttonWidth };

  return (
    <View style={styles.screen}>
      <Text>Opponent's Guess</Text>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card style={styles.buttonContainer}>
        <View style={buttonWidthStyle}>
          <MainButton onPress={() => nextGuessHandler(GUESS.LOWER)}>
            <Ionicons name="md-remove" size={24} color="white" />
          </MainButton>
        </View>
        <View style={buttonWidthStyle}>
          <MainButton onPress={() => nextGuessHandler(GUESS.GREATER)}>
            <Ionicons name="md-add" size={24} color="white" />
          </MainButton>
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
    marginTop: deviceHeight > 600 ? 20 : 10,
    width: '90%',
  },
});
