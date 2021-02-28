import { MEALS } from '../../data/dummy';
import Meal from '../../models/meal';
import MealFilters from '../../models/mealFilters.model';
import { SET_FILTERS, TOGGLE_FAVORITE } from '../actions/meals.action';
import MealState from '../mealsState.model';

const initialState: MealState = {
  meals: MEALS,
  filteredMeals: MEALS,
  favoriteMeals: [],
};

interface MealActionsPayload {
  meals: Meal[];
  meal: Meal;
  mealFilters: MealFilters;
}

interface MealActions {
  type: string;
  payload: MealActionsPayload;
}

const mealsReducer = (state = initialState, action: MealActions): MealState => {
  switch (action.type) {
    case TOGGLE_FAVORITE: {
      let favoriteMeals = [...state.favoriteMeals];
      const existingIndex = favoriteMeals.findIndex((meal) => action.payload.meal.id === meal.id);
      if (existingIndex >= 0) {
        favoriteMeals.splice(existingIndex, 1);
      } else {
        favoriteMeals = [...favoriteMeals, action.payload.meal];
      }
      return { ...state, favoriteMeals };
    }

    case SET_FILTERS: {
      const appliedFilters = action.payload.mealFilters;
      const filteredMeals = state.meals.filter((meal) => {
        for (let filter in appliedFilters) {
          if (!meal[filter as keyof Meal] && appliedFilters[filter as keyof MealFilters]) {
            return false;
          }
        }
        return true;
      });
      return { ...state, filteredMeals };
    }

    default: {
      return state;
    }
  }
};

export default mealsReducer;
