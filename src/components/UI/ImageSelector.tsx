import { launchCameraAsync } from 'expo-image-picker';
import React, { FC, useState } from 'react';
import { Button, Image, StyleSheet, Text, View, ViewStyle } from 'react-native';
import appColors from '../../constants/appColors';

const ImageSelector: FC<{ styles?: ViewStyle; onImageSelect: (path: string) => void }> = (props) => {
  const [takenImage, setTakenImage] = useState('');

  const takeImageHandler = async () => {
    const image: any = await launchCameraAsync();
    if (!image.cancelled) {
      setTakenImage(image.uri);
      props.onImageSelect(image.uri);
    }
  };
  return (
    <View style={{ ...styles.imagePicker, ...props.styles }}>
      <View style={styles.imagePreview}>
        {takenImage === '' && <Text>No Image Picked Yet.</Text>}
        {takenImage !== '' && <Image source={{ uri: takenImage }} style={styles.image} />}
      </View>
      <Button title="Take Image" color={appColors.primary} onPress={takeImageHandler} />
    </View>
  );
};
//
export default ImageSelector;

const styles = StyleSheet.create({
  imagePicker: {
    alignItems: 'center',
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#ccc',
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
