import React from 'react';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import ShopNavigator from './src/navigation/ShopNavigator';
import productReducer from './src/store/reducers/product.reducer';

const rootStore = combineReducers({
  products: productReducer,
});

const state = createStore(rootStore);

export default function App() {
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
