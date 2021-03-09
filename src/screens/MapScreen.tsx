import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import MapView, { LatLng, MapEvent, Marker } from 'react-native-maps';
import { NavigationStackScreenComponent, NavigationStackScreenProps } from 'react-navigation-stack';
import appColors from '../constants/appColors';
import { isAndroid } from '../utils/utilityFunctions';

const MapScreen: NavigationStackScreenComponent = (props) => {
  const [coordinate, setCoordinate] = useState<LatLng>();
  const mapRegion = {
    latitude: 18.4567478,
    longitude: 73.7913924,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  const onClickLocation = (event: MapEvent<{}>) => {
    setCoordinate(event.nativeEvent.coordinate);
  };

  const savePickedLocationHandler = useCallback(() => {
    if (coordinate) {
      props.navigation.navigate({ routeName: 'NewPlace', params: { coordinate } });
    }
  }, [coordinate]);

  useEffect(() => {
    props.navigation.setParams({ saveLocation: savePickedLocationHandler });
  }, [savePickedLocationHandler]);

  return (
    <MapView onPress={onClickLocation} style={{ flex: 1 }} region={mapRegion}>
      {coordinate && <Marker title="Picked Location" coordinate={coordinate}></Marker>}
    </MapView>
  );
};

MapScreen.navigationOptions = (props: NavigationStackScreenProps) => {
  const saveLocation = props.navigation.getParam('saveLocation');
  return {
    headerRight: () => (
      <TouchableOpacity style={{ paddingHorizontal: 10, width: 80 }} onPress={saveLocation}>
        <Text style={{ color: isAndroid ? 'white' : appColors.primary, fontSize: 18, fontWeight: 'bold' }}>Save</Text>
      </TouchableOpacity>
    ),
  };
};

export default MapScreen;

const styles = StyleSheet.create({});
