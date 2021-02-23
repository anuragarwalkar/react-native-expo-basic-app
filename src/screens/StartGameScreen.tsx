import React, { useEffect, useState } from 'react';
import {
  Alert,
  Button,
  Keyboard,
  KeyboardAvoidingView,
  ScrollView,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Card from '../components/Card';
import CustomInput from '../components/CustomInput';
import MainButton from '../components/MainButton';
import NumberContainer from '../components/NumberContainer';
import colors from '../constants/colors';
import defaultStyle from '../constants/defaultStyle';
import { deviceWidth, getDimensions } from '../utils/utilFunctions';

interface propsType {
  onStartGame: (selectedNumber: number) => void;
}

export default function StartGameScreen(props: propsType) {
  const [enteredValue, setEnteredValue] = useState('');
  const [confirmed, setConfirmed] = useState(false);
  const [selectedNumber, setSelectedNumber] = useState(0);
  const [buttonWidth, setButtonWidth] = useState(deviceWidth / 4);

  const buttonStyle = { width: buttonWidth };

  let removeDimentionListner: () => void;

  const updateDimensions = (width: number) => {
    setButtonWidth(width / 4);
  };

  useEffect(() => {
    removeDimentionListner = getDimensions(updateDimensions);
    return () => {
      removeDimentionListner();
    };
  });

  const numberInputHandler = (inputText: string) => {
    setEnteredValue(inputText.replace(/[^0-9]/g, ''));
  };

  const resetInputHandler = () => {
    setConfirmed(false);
    setEnteredValue('');
  };

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
    Keyboard.dismiss();
  };

  let confirmedOutput = null;

  if (confirmed) {
    confirmedOutput = (
      <Card style={styles.startGameContainer}>
        <Text style={styles.startGameText}>You selected</Text>
        <NumberContainer>{selectedNumber}</NumberContainer>
        <MainButton onPress={() => props.onStartGame(selectedNumber)}>Start Game</MainButton>
      </Card>
    );
  }

  return (
    <ScrollView>
      <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={34}>
        <TouchableWithoutFeedback
          onPress={() => {
            Keyboard.dismiss();
          }}
        >
          <View style={styles.screen}>
            <Text style={styles.titleText}>Start a New Game</Text>
            <Card style={styles.newGameContainer}>
              <Text style={styles.defaultText}>Select a Number</Text>
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
                <View style={buttonStyle}>
                  <Button title="Reset" onPress={resetInputHandler} color={colors.secondary} />
                </View>
                <View style={buttonStyle}>
                  <Button title="Confirm" onPress={onConfirmInputHandler} color={colors.primary} />
                </View>
              </View>
            </Card>
            {confirmedOutput}
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = defaultStyle({
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
  titleText: {
    fontSize: 20,
    marginVertical: 10,
  },
  input: {
    width: 50,
    textAlign: 'center',
  },
  startGameContainer: {
    marginTop: 10,
    width: '60%',
    minWidth: 250,
  },
  newGameContainer: {
    width: '80%',
    minWidth: 280,
  },
  startGameText: {
    fontSize: 18,
    marginBottom: 10,
  },
});
