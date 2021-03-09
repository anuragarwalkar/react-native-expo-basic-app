import { LocationObject } from 'expo-location';
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MapPreview: FC<{ location: LocationObject['coords'] | undefined }> = ({ location, children }) => {
  let imageUrl;

  if (location) {
    imageUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${location.latitude},${location.longitude}&key=YOUR_API_KEY`;
  }

  let view = <View>{children}</View>;

  if (location) {
    view = (
      <View>
        {/* Maps is not configured */}
        {/* <Image source={{ uri: imageUrl }} width={400} height={200} /> */}
        {/* ******************** */}
        <Text>{location.longitude}</Text>
        <Text>{location.latitude}</Text>
      </View>
    );
  }

  return view;
};

export default MapPreview;

const styles = StyleSheet.create({});
