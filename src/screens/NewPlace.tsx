import { LocationObject } from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useDispatch } from 'react-redux';
import LocationPicker from '../components/places/LocationPicker';
import ImageSelector from '../components/UI/ImageSelector';
import appColors from '../constants/appColors';
import { addPlace } from '../store/actions/places.actions';

const NewPlace: NavigationStackScreenComponent = ({ navigation }) => {
  const coordinate = navigation.getParam('coordinate');
  const [value, setValue] = useState('');
  const [imagePath, setImagePath] = useState('');
  const [location, setLocation] = useState<LocationObject['coords']>();
  const dispatch = useDispatch();

  const onTextChangeHandler = (text: string) => {
    // Validation logic
    setValue(text);
  };

  useEffect(() => {
    if (coordinate) {
      setLocation(coordinate);
    }
  }, [coordinate]);

  const savePlaceHandler = () => {
    if (location && imagePath && value) {
      dispatch(addPlace(value, imagePath, location));
      navigation.goBack();
    } else {
      Alert.alert('Invalid Form', 'Please make sure you input all data', [{ text: 'ok' }]);
    }
  };

  const onLocationPicked = (coords: LocationObject['coords']) => {
    setLocation(coords);
  };

  return (
    <ScrollView>
      <View style={styles.form}>
        <Text style={styles.label}>Title</Text>
        <TextInput style={styles.textInput} value={value} onChangeText={onTextChangeHandler} />
        <ImageSelector styles={{ marginVertical: 20 }} onImageSelect={setImagePath} />
        <LocationPicker onLocationPicked={onLocationPicked} />
        <View style={{ marginTop: 10 }}>
          <Button title="Save Place" color={appColors.primary} onPress={savePlaceHandler} />
        </View>
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
