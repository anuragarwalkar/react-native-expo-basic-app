import AppLoading from 'expo-app-loading';
import { loadAsync } from 'expo-font';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';
import { OPEN_SANS, OPEN_SANS_BOLD } from './src/constants/Fonts';
import ShopNavigator from './src/navigation/ShopNavigator';
import authReducer from './src/store/reducers/auth.reducer';
import cartReducer from './src/store/reducers/cart.reducer';
import ordersReducer from './src/store/reducers/orders.reducer';
import productReducer from './src/store/reducers/product.reducer';

const rootStore = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: ordersReducer,
  auth: authReducer,
});

const fetchFonts = () => {
  return loadAsync({
    [OPEN_SANS]: require('./assets/fonts/OpenSans-Regular.ttf'),
    [OPEN_SANS_BOLD]: require('./assets/fonts/OpenSans-Bold.ttf'),
  });
};
const middlewares = [ReduxThunk];
const middlewareEnhancer = applyMiddleware(...middlewares);
const enhancers = [middlewareEnhancer];
const composedEnhancers = composeWithDevTools(...enhancers);

const state = createStore(rootStore, composedEnhancers);

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
      <ShopNavigator />
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
