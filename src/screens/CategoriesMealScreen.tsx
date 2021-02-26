import React, { FC } from 'react';
import { enableScreens } from 'react-native-screens';
import { NavigationScreenProp } from 'react-navigation';
import MealList from '../components/MealList';
import { CATEGORIES, MEALS } from '../data/dummy';
import Category from '../models/category';
import Meal from '../models/meal';

enableScreens();

interface CategoriesMealScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

interface NavStatelessComponent extends FC<CategoriesMealScreenProps> {
  navigationOptions?: Object;
}

const getCategoryId = (props: CategoriesMealScreenProps) => {
  return props.navigation.getParam('categoryId');
};

const getSelectedCategory = (props: CategoriesMealScreenProps): Category => {
  const categoryId = getCategoryId(props);
  const selectedCategory = CATEGORIES.find((cat) => cat.id === categoryId);
  return selectedCategory ? selectedCategory : new Category('', '', '');
};

const CategoriesMealScreen: NavStatelessComponent = (props) => {
  const selectedCategoryId = getCategoryId(props);

  const filteredMeals = MEALS.filter((meal: Meal) => meal.categoryIds.indexOf(selectedCategoryId) >= 0);
  const displayedMeals = filteredMeals ? filteredMeals : [];

  return <MealList data={displayedMeals} navigation={props.navigation} />;
};

CategoriesMealScreen.navigationOptions = (navigationData: CategoriesMealScreenProps) => {
  const { title: headerTitle } = getSelectedCategory(navigationData);

  return {
    headerTitle,
  };
};

export default CategoriesMealScreen;
