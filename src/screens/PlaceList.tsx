import React from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useSelector } from 'react-redux';
import PlaceItem from '../components/places/PlaceItem';
import CustomHeaderIcon from '../components/UI/CustomHeaderIcon';
import { selectPlaces } from '../utils/utilityFunctions';

const PlaceList: NavigationStackScreenComponent = (props) => {
  const places = useSelector(selectPlaces);

  const navigateToPlaceDetails = (title: string) => {
    props.navigation.navigate({ routeName: 'PlaceDetails', params: { title } });
  };
  return (
    <FlatList
      data={places}
      renderItem={({ item }) => (
        <PlaceItem
          title={item.title}
          image={null}
          address={null}
          onSelect={navigateToPlaceDetails.bind(this, item.title)}
        />
      )}
    />
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
