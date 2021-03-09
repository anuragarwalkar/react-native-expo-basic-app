import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useSelector } from 'react-redux';
import RootState from '../models/redux/RootState.model';

const PlaceDetails: NavigationStackScreenComponent = (props) => {
  const itemId = props.navigation.getParam('id');

  const place = useSelector((state: RootState) => state.places.places.find((item) => item.id === itemId));

  return (
    <View style={styles.container}>
      <Image source={{ uri: place?.image }} style={styles.image} />
      <View style={{ alignItems: 'center', marginTop: 20 }}>
        <Text style={{ fontSize: 20 }}>{place?.title}</Text>
      </View>
      <View style={{ alignItems: 'center', marginTop: 10 }}>
        <Text>Address: {place?.address}</Text>
      </View>
    </View>
  );
};

export default PlaceDetails;

const styles = StyleSheet.create({
  image: { width: '100%', height: 200 },
  container: {
    padding: 20,
  },
});

PlaceDetails.navigationOptions = (navData) => {
  const headerTitle = navData.navigation.getParam('title');
  return {
    headerTitle,
  };
};
