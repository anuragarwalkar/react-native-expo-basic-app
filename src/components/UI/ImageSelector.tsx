import { launchCameraAsync } from 'expo-image-picker';
import { CAMERA, MEDIA_LIBRARY } from 'expo-permissions';
import React, { FC, useState } from 'react';
import { Button, Image, StyleSheet, Text, View, ViewStyle } from 'react-native';
import appColors from '../../constants/appColors';
import { verifyPermissions } from '../../utils/utilityFunctions';

const ImageSelector: FC<{ styles?: ViewStyle; onImageSelect: (path: string) => void }> = (props) => {
  const [takenImage, setTakenImage] = useState('');

  const takeImageHandler = async () => {
    if (await verifyPermissions(CAMERA, MEDIA_LIBRARY)) {
      const image: any = await launchCameraAsync({
        allowsEditing: true,
        aspect: [16, 9],
        quality: 0.5,
      });
      if (!image.cancelled) {
        setTakenImage(image.uri);
        props.onImageSelect(image.uri);
      }
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
