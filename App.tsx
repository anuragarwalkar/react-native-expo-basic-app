import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import appColors from './src/constants/appColors';
import useDatabse from './src/hooks/useDatabse';
import PlacesNavigator from './src/navigation/PlacesNavigator';
import placesReducer from './src/store/reducers/places.reducer';
import { globalStyles } from './src/styles/styles';

const rootReducer = combineReducers({
  places: placesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  const [dbInit] = useDatabse();

  if (!dbInit) {
    return (
      <View style={globalStyles.absoluteCenter}>
        <ActivityIndicator size="large" color={appColors.primary} />
      </View>
    );
  }

  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
