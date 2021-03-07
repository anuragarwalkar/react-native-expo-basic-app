import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import CustomHeaderIcon from '../components/UI/CustomHeaderIcon';

const PlaceList: NavigationStackScreenComponent = (props) => {
  return (
    <View>
      <Text></Text>
    </View>
  );
};

PlaceList.navigationOptions = (navData) => {
  const navigateToNewPlace = navData.navigation.navigate.bind(this, 'NewPlace');
  return {
    headerTitle: 'All Places',
    headerRight: () => <CustomHeaderIcon title="Add Place" name="add" onPress={navigateToNewPlace} />,
  };
};

export default PlaceList;

const styles = StyleSheet.create({});
