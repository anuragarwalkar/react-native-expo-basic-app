import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import colors from '../constants/colors';
import CategoriesMealScreen from '../screens/CategoriesMealScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import MealDetailsScreen from '../screens/MealDetailsScreen';

const mealStackNavigatorRouteConfig = {
  Categories: CategoriesScreen,
  CategoriesMeals: CategoriesMealScreen,
  MealDetails: {
    screen: MealDetailsScreen,
  },
};
const defaultStackNavigatorOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: Platform.OS === 'android' ? colors.primaryColor : 'white',
    },
    headerTintColor: Platform.OS === 'ios' ? colors.primaryColor : 'white',
  },
};
const favoriteStackNavigatorRouteConfig = {
  Favorites: FavoritesScreen,
  MealDetails: MealDetailsScreen,
};

export const MealsNavigator = createStackNavigator(mealStackNavigatorRouteConfig, defaultStackNavigatorOptions);

export const FavoritesStackNavigator = createStackNavigator(
  favoriteStackNavigatorRouteConfig,
  defaultStackNavigatorOptions
);

export const defaultBottomNavigationRouteConfig = {
  Meals: {
    screen: MealsNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo: any) => {
        return <Ionicons name="ios-restaurant" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: colors.primaryColor,
    },
  },
  favorites: {
    screen: FavoritesStackNavigator,
    navigationOptions: {
      tabBarIcon: (tabInfo: any) => {
        return <Ionicons name="ios-star" size={25} color={tabInfo.tintColor} />;
      },
      tabBarColor: colors.accentColor,
    },
  },
};
