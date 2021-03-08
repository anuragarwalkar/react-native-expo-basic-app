import Place from '../../models/Place.class';
import { ADD_PLACE, FETCH_PLACES, PlacesActions } from '../actions/places.actions';

export interface PlacesState {
  places: Place[];
}
const initialState: PlacesState = {
  places: [],
};

export default (state = initialState, action: PlacesActions) => {
  switch (action.type) {
    case ADD_PLACE: {
      const { title, image, id } = action.payload;
      const newPlace = new Place(id, title, image);
      return {
        ...state,
        places: [...state.places, newPlace],
      };
    }

    case FETCH_PLACES: {
      const { places, length } = action.payload;
      return {
        ...state,
        places,
        length,
      };
    }

    default: {
      return state;
    }
  }
};
