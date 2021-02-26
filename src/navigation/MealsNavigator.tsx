import { LogBox } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import colors from '../constants/colors';
import FiltersScreen from '../screens/FiltersScreen';
import { isAndroid } from '../utils/utilityFunctions';
import { defaultBottomNavigationRouteConfig } from './NavigationDef';

enableScreens();

const defaultTabBarOptions = {
  tabBarOptions: {
    activeTintColor: colors.accentColor,
  },
};

const MealsFavNavigator = isAndroid()
  ? createMaterialBottomTabNavigator(defaultBottomNavigationRouteConfig, {
      activeColor: 'white',
      shifting: false,
    })
  : createBottomTabNavigator(defaultBottomNavigationRouteConfig, defaultTabBarOptions);

const FiltersNavigator = createStackNavigator({
  Filters: FiltersScreen,
});

const MainNavigator = createDrawerNavigator({
  MealsFav: MealsFavNavigator,
  Filters: FiltersNavigator,
});

LogBox.ignoreLogs(['Your project is accessing the following APIs']);

export default createAppContainer(MainNavigator);
