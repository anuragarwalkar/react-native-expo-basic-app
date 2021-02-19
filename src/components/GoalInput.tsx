import React, { useState } from 'react';
import { Button, StyleSheet, TextInput, View, Modal } from 'react-native';

interface propsTypes {
  onAddPress: (value: string) => void;
  show: boolean;
  onHide: () => void;
}

export default function GoalInput(props: propsTypes) {
  const [enterdGoal, setEnterdGoal] = useState('');

  const resetEnteredGoal = () => {
    setEnterdGoal('');
  };

  const onChangeButton = (inputText: string) => {
    setEnterdGoal(inputText);
  };

  const onAddPress = () => {
    if (enterdGoal !== '' && enterdGoal !== ' ') {
      props.onAddPress(enterdGoal);
      resetEnteredGoal();
    }
  };

  const onCancel = () => {
    props.onHide();
  };

  return (
    <Modal visible={props.show} animationType="slide">
      <View style={styles.inputAndButtonContainer}>
        <TextInput
          onChangeText={onChangeButton}
          placeholder="Cource Goal"
          value={enterdGoal}
          style={styles.textInput}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonView}>
            <Button title="close" color="red" onPress={onCancel} />
          </View>
          <View style={styles.buttonView}>
            <Button onPress={onAddPress} title="add" />
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    width: '70%',
  },
  inputAndButtonContainer: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  buttonsContainer: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
  },
  buttonView: {
    width: 100,
  },
});
