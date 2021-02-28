import Meal from '../models/meal';

export default interface MealState {
  meals: Meal[];
  filteredMeals: Meal[];
  favoriteMeals: Meal[];
}
