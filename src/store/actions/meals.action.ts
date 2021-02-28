import Meal from '../../models/meal';
import MealFilters from '../../models/mealFilters.model';

export const TOGGLE_FAVORITE = 'TOGGLE_FAVORITE';
export const SET_FILTERS = 'SET_FILTERS';

export const toggleFavorite = (meal: Meal) => {
  return {
    type: TOGGLE_FAVORITE,
    payload: {
      meal,
    },
  };
};

export const setFilters = (mealFilters: MealFilters) => {
  return {
    type: SET_FILTERS,
    payload: {
      mealFilters,
    },
  };
};
