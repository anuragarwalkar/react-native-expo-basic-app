import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import AppLoading from 'expo-app-loading';
import { loadAsync } from 'expo-font';

const fetchFonts = () => {
  return loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Bold.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Regular.ttf'),
  });
};

export default function App() {
  const [fontLoaded, setFontLoaded] = useState(false);

  const setIsFontLoded = () => {
    setFontLoaded(true);
  };

  if (!fontLoaded) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={setIsFontLoded}
        onError={() => console.log('error ocurred while loading the font')}
      />
    );
  }

  return (
    <View style={styles.container}>
      <Text>Hello World</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
