import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import CategoriesMealScreen from '../screens/CategoriesMealScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import MealDetailsScreen from '../screens/MealDetailsScreen';

const mealsNavigator = createStackNavigator({
  Categories: CategoriesScreen,
  CategoriesMeals: CategoriesMealScreen,
  MealDetails: {
    screen: MealDetailsScreen,
  },
});

export default createAppContainer(mealsNavigator);
