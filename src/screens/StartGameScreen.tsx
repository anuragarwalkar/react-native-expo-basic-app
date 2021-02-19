import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';
import Card from '../components/Card';
import CustomInput from '../components/CustomInput';
import colors from '../constants/colors';

export default function StartGameScreen() {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(0);

  const numberInputHandler = (inputText: string) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setConfirmed(false);
    setEnteredValue('');
  };

  const onStartGame = () => {};

  const onConfirmInputHandler = () => {
    const chosenNumber = parseInt(enteredValue);

    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      Alert.alert('Invalid number', 'Number has to be 0 to 99', [
        { text: 'Okay', style: 'destructive', onPress: resetInputHandler },
      ]);
      return;
    }
    setConfirmed(true);
    setSelectedNumber(chosenNumber);
    setEnteredValue('');
  };

  let confirmedOutput = null;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.startGameContainer}>
        <Text style={styles.startGameText}>You selected</Text>
        <View>
          <Text style={styles.startGameText}>{selectedNumber}</Text>
        </View>
        <Button onPress={onStartGame} title="Start the game" />
      </Card>
    );
  }

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        Keyboard.dismiss();
      }}
    >
      <View style={styles.screen}>
        <Text style={styles.title}>Start a New Game</Text>
        <Card>
          <Text>Select a Number</Text>
          <CustomInput
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            blurOnSubmit
            style={styles.input}
            maxLength={2}
            value={enteredValue}
            onChangeText={numberInputHandler}
          />
          <View style={styles.buttonsContainer}>
            <View style={styles.buttonStyle}>
              <Button title="Reset" onPress={resetInputHandler} color={colors.secondary} />
            </View>
            <View style={styles.buttonStyle}>
              <Button title="Confirm" onPress={onConfirmInputHandler} color={colors.primary} />
            </View>
          </View>
        </Card>
        {confirmedOutput}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    alignItems: 'center',
  },
  buttonStyle: {
    width: 100,
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  input: {
    width: 50,
    textAlign: 'center',
  },
  startGameContainer: {
    marginTop: 10,
  },
  startGameText: {
    fontSize: 18,
    marginBottom: 10,
  },
});
