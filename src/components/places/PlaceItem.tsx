import React, { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import appColors from '../../constants/appColors';

interface PlaceItemProps {
  onSelect: () => void;
  image: string | null;
  title: string;
  address: string | null;
}
const PlaceItem: FC<PlaceItemProps> = (props) => {
  return (
    <TouchableOpacity onPress={props.onSelect} style={styles.placeItem}>
      {props.image && <Image style={styles.image} source={{ uri: props.image }} />}
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{props.title}</Text>
        <Text style={styles.address}>{props.address ? props.address : 'Mangal Bhairav, Nande City, Pune'}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  placeItem: {
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    paddingVertical: 15,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#ccc',
    borderColor: appColors.primary,
    borderWidth: 1,
  },
  infoContainer: {
    marginLeft: 25,
    width: 250,
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  title: {
    color: 'black',
    fontSize: 18,
    marginBottom: 5,
  },
  address: {
    color: '#666',
    fontSize: 16,
  },
});

export default PlaceItem;
