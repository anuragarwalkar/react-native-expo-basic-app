import Place from '../../models/Place.class';
import { ADD_PLACE } from '../actions/places.actions';

export interface PlacesState {
  places: Place[];
}
const initialState: PlacesState = {
  places: [],
};

export default (state = initialState, action: { type: string; payload: { title: string } }) => {
  switch (action.type) {
    case ADD_PLACE: {
      const newPlace = new Place(new Date().toString(), action.payload.title);
      return {
        ...state,
        places: [...state.places, newPlace],
      };
    }
  }

  return state;
};
