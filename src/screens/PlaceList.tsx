import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import PlaceItem from '../components/places/PlaceItem';
import CustomHeaderIcon from '../components/UI/CustomHeaderIcon';
import { fetchPlacesActionCreator } from '../store/actions/places.actions';
import { selectPlaces } from '../utils/utilityFunctions';

const PlaceList: NavigationStackScreenComponent = (props) => {
  const places = useSelector(selectPlaces);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchPlacesActionCreator());
  }, [dispatch]);

  const navigateToPlaceDetails = (title: string, id: number) => {
    props.navigation.navigate({ routeName: 'PlaceDetails', params: { title, id } });
  };
  return (
    <FlatList
      data={places}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item: { id, title, image } }) => (
        <PlaceItem title={title} image={image} address={null} onSelect={navigateToPlaceDetails.bind(this, title, id)} />
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
