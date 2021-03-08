import { documentDirectory, moveAsync } from 'expo-file-system';
import { SQLResultSet } from 'expo-sqlite';
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { fetchPlaces, insertPlace } from '../../helpers/database';
import Place from '../../models/Place.class';
import RootState from '../../models/redux/RootState.model';

export const ADD_PLACE = 'ADD_PLACE';
export const FETCH_PLACES = 'FETCH_PLACES';

interface AddPlaceAction {
  type: typeof ADD_PLACE;
  payload: {
    title: string;
    image: string;
    id: number;
  };
}

interface FetchPlacesAction {
  type: typeof FETCH_PLACES;
  payload: {
    places: Place[];
    length: number;
  };
}

export const addPlace = (title: string, image: string): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    const fileName = image.split('/').pop();
    console.log('documentDirectory:', documentDirectory);
    const newPath = documentDirectory + (fileName ? fileName : '');
    let dbRes: SQLResultSet;
    try {
      if (fileName) {
        await moveAsync({
          from: image,
          to: newPath,
        });
      }

      dbRes = await insertPlace(title, newPath, 'Nanded City', 15.6, 14.6);
    } catch (error) {
      console.log('error:', error);
      throw new Error(error.message);
    }

    dispatch({
      type: ADD_PLACE,
      payload: {
        title,
        image: newPath,
        id: dbRes.insertId,
      },
    });
  };
};

export const fetchPlacesActionCreator = (): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    let places: Place[];
    let length: number;
    try {
      const { rows, length: rowsLen } = await fetchPlaces();
      places = rows;
      length = rowsLen;
    } catch (error) {
      console.log('error:', error);
      throw new Error(error.message);
    }

    dispatch({
      type: FETCH_PLACES,
      payload: {
        places,
        length,
      },
    });
  };
};

export type PlacesActions = AddPlaceAction | FetchPlacesAction;
