import { Platform } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import colors from '../constants/colors';
import CategoriesMealScreen from '../screens/CategoriesMealScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import MealDetailsScreen from '../screens/MealDetailsScreen';
import { enableScreens } from 'react-native-screens';

enableScreens();

const mealsNavigator = createStackNavigator(
  {
    Categories: CategoriesScreen,
    CategoriesMeals: CategoriesMealScreen,
    MealDetails: {
      screen: MealDetailsScreen,
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: Platform.OS === 'android' ? colors.primaryColor : 'white',
      },
      headerTintColor: Platform.OS === 'ios' ? colors.primaryColor : 'white',
    },
  }
);

export default createAppContainer(mealsNavigator);
