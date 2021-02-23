import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Header from './src/components/Header';
import GameScreen from './src/screens/GameScreen';
import StartGameScreen from './src/screens/StartGameScreen';
import GameOverScreen from './src/screens/GameOverScreen';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { OPEN_SANS, OPEN_SANS_BOLD } from './src/constants/fonts';

const fetchFonts = () => {
  return Font.loadAsync({
    [OPEN_SANS_BOLD]: require('./assets/fonts/OpenSans-Bold.ttf'),
    [OPEN_SANS]: require('./assets/fonts/OpenSans-Regular.ttf'),
  });
};

export default function App() {
  const [userNumber, setUserNUmber] = useState<number | null>(null);
  const [guessRound, setGuessRounds] = useState(0);
  const [dataLoaded, setDataLoaded] = useState(false);

  if (!dataLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onError={(err) => {
          console.error(err);
        }}
        onFinish={() => setDataLoaded(true)}
      />
    );
  }

  const startGameHandler = (selectedNumber: number) => {
    setUserNUmber(selectedNumber);
    setGuessRounds(0);
  };

  const gameOverHandler = (numberOfRounds: number) => {
    setGuessRounds(numberOfRounds);
  };

  const onResetGame = () => {
    setUserNUmber(-1);
    setGuessRounds(0);
  };

  let content = <StartGameScreen onStartGame={startGameHandler} />;

  if (userNumber && guessRound <= 0) {
    content = <GameScreen userChoise={userNumber} onGameOver={gameOverHandler} />;
  } else if (guessRound > 0 && userNumber) {
    content = <GameOverScreen resetGame={onResetGame} userNumber={userNumber} numberOfRounds={guessRound} />;
  }

  return (
    <View style={styles.container}>
      <Header title="Guess a Number" />
      {content}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
