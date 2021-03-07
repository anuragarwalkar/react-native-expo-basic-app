import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useDispatch } from 'react-redux';
import appColors from '../constants/appColors';
import { addPlace } from '../store/actions/places.actions';

const NewPlace: NavigationStackScreenComponent = ({ navigation }) => {
  const [value, setValue] = useState('');
  const dispatch = useDispatch();

  const onTextChangeHandler = (text: string) => {
    // Validation logic
    setValue(text);
  };

  const savePlaceHandler = () => {
    dispatch(addPlace(value));
    navigation.goBack();
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.textInput} value={value} onChangeText={onTextChangeHandler} />
        <Button title="Save Place" color={appColors.primary} onPress={savePlaceHandler} />
      </View>
    </ScrollView>
  );
};
NewPlace.navigationOptions = () => {
  return {
    headerTitle: 'Add Place',
  };
};
export default NewPlace;

const styles = StyleSheet.create({
  form: {
    margin: 30,
  },
  label: {
    fontSize: 18,
    marginBottom: 15,
  },
  textInput: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    marginBottom: 15,
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
});
