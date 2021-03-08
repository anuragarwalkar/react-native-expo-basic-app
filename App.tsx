import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, combineReducers, createStore } from 'redux';
import ReduxThunk from 'redux-thunk';
import { init } from './src/helpers/database';
import PlacesNavigator from './src/navigation/PlacesNavigator';
import placesReducer from './src/store/reducers/places.reducer';

init()
  .then(async (res) => {
    console.log('sql-lite:', 'Database Connected');
  })
  .catch((err) => {
    console.log('Err:', err);
  });

const rootReducer = combineReducers({
  places: placesReducer,
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <PlacesNavigator />
    </Provider>
  );
}
