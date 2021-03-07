import { launchCameraAsync } from 'expo-image-picker';
import { askAsync, CAMERA, MEDIA_LIBRARY } from 'expo-permissions';
import React, { FC, useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, View, ViewStyle } from 'react-native';
import appColors from '../../constants/appColors';

const ImageSelector: FC<{ styles?: ViewStyle; onImageSelect: (path: string) => void }> = (props) => {
  const [takenImage, setTakenImage] = useState('');

  const verifyPermissions = async () => {
    const result = await askAsync(CAMERA, MEDIA_LIBRARY);
    if (result.status !== 'granted') {
      Alert.alert('Insufficient Permissions', 'You need to grant camera permissions', [{ text: 'Okay' }]);
      return false;
    }
    return true;
  };
  const takeImageHandler = async () => {
    if (verifyPermissions()) {
      const image: any = await launchCameraAsync();
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
