import AppLoading from 'expo-app-loading';
import { loadAsync } from 'expo-font';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { OPEN_SANS, OPEN_SANS_BOLD } from './src/constants/fonts';
import MealsNavigator from './src/navigation/MealsNavigator';

const fetchFonts = () => {
  return loadAsync({
    [OPEN_SANS]: require('./assets/fonts/OpenSans-Regular.ttf'),
    [OPEN_SANS_BOLD]: require('./assets/fonts/OpenSans-Bold.ttf'),
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

  return <MealsNavigator />;
}
