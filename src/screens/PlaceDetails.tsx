import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';

interface PlaceDetailsParams {
  id: number;
  title: string;
}

const PlaceDetails: NavigationStackScreenComponent<PlaceDetailsParams> = (props) => {
  const itemId = props.navigation.getParam('id');
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
