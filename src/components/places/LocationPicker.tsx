import { getCurrentPositionAsync, LocationObject } from 'expo-location';
import { LOCATION } from 'expo-permissions';
import React, { FC, useState } from 'react';
import { ActivityIndicator, Alert, Button, StyleSheet, Text, View } from 'react-native';
import { useNavigation } from 'react-navigation-hooks';
import appColors from '../../constants/appColors';
import { verifyPermissions } from '../../utils/utilityFunctions';
import MapPreview from './MapPreview';

type Props = {
  onLocationPicked: (cords: LocationObject['coords']) => void;
};
const LocationPicker: FC<Props> = (props) => {
  const [pickedLocation, setPickedLocation] = useState<LocationObject['coords']>();
  const [gettingLocationn, setGettingLocation] = useState(false);
  const navigation = useNavigation();
  useNavigation();
  const getLoactionHeader = async () => {
    setGettingLocation(true);
    const hasPermissions = await verifyPermissions(LOCATION);

    if (!hasPermissions) {
      return false;
    }
    try {
      const result = await getCurrentPositionAsync({});
      setPickedLocation(result.coords);
      props.onLocationPicked(result.coords);
    } catch (error) {
      Alert.alert('Could not fetch the location', 'please try again', [{ text: 'ok' }]);
    }
    setGettingLocation(false);
  };
  return (
    <View style={styles.container}>
      <View style={styles.mapPreview}>
        <MapPreview location={pickedLocation}>
          {gettingLocationn && <ActivityIndicator size="large" color={appColors.primary} />}
          {!pickedLocation && !gettingLocationn && <Text>No Location Chosen yet!</Text>}
        </MapPreview>
      </View>
      <View style={styles.buttonContainer}>
        <View style={{ width: 150 }}>
          <Button title="Get location" onPress={getLoactionHeader} color={appColors.primary} />
        </View>
        <View style={{ width: 150 }}>
          <Button
            title="Select Location"
            onPress={() => {
              navigation.navigate('Maps');
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default LocationPicker;

const styles = StyleSheet.create({
  container: {
    marginBottom: 15,
  },
  mapPreview: {
    marginBottom: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: 150,
    borderColor: appColors.borderColor,
    borderWidth: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});
