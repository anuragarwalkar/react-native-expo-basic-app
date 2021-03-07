import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

const NewPlace: NavigationStackScreenComponent = (props) => {
  return (
    <View>
      <Text></Text>
    </View>
  );
};
NewPlace.navigationOptions = () => {
  return {
    headerTitle: 'Add Place',
  };
};
export default NewPlace;

const styles = StyleSheet.create({});
