import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

const PlaceDetails: NavigationStackScreenComponent = () => {
  return (
    <View>
      <Text></Text>
    </View>
  );
};

export default PlaceDetails;

PlaceDetails.navigationOptions = (navData) => {
  const headerTitle = navData.navigation.getParam('title');
  return {
    headerTitle,
  };
};

const styles = StyleSheet.create({});
