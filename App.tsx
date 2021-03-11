import AppLoading from 'expo-app-loading';
import { loadAsync } from 'expo-font';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { OPEN_SANS, OPEN_SANS_BOLD } from './src/constants/Fonts';
import AppNavigator from './src/navigation/AppNavigator';
import cartReducer from './src/store/reducers/cart.reducer';
import ordersReducer from './src/store/reducers/orders.reducer';
import productReducer from './src/store/reducers/product.reducer';

const rootStore = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: ordersReducer,
});

const fetchFonts = () => {
  return loadAsync({
    [OPEN_SANS]: require('./assets/fonts/OpenSans-Regular.ttf'),
    [OPEN_SANS_BOLD]: require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};

const state = createStore(rootStore, composeWithDevTools());

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
        onError={() => console.error('error ocurred while loading the font')}
      />
    );
  }
  return (
    <Provider store={state}>
      <AppNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
});
