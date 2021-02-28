import React, { FC } from 'react';
import { Text, View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { NavigationScreenProp } from 'react-navigation';
import { useSelector } from 'react-redux';
import MealList from '../components/MealList';
import { CATEGORIES } from '../data/dummy';
import Category from '../models/category';
import Meal from '../models/meal';
import RootState from '../store/rootState.model';
import { globalStyles } from '../utils/utilityFunctions';

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
  const availableMeals = useSelector((state: RootState) => state.meals.filteredMeals);

  const selectedCategoryId = getCategoryId(props);

  const filteredMeals = availableMeals.filter((meal: Meal) => meal.categoryIds.indexOf(selectedCategoryId) >= 0);
  const displayedMeals = filteredMeals ? filteredMeals : [];

  if (displayedMeals.length === 0) {
    return (
      <View style={globalStyles.absuluteCenter}>
        <Text style={globalStyles.text}>No Meals Found, Maybe check Your Filters?</Text>
      </View>
    );
  }

  return <MealList data={displayedMeals} navigation={props.navigation} />;
};

CategoriesMealScreen.navigationOptions = (navigationData: CategoriesMealScreenProps) => {
  const { title: headerTitle } = getSelectedCategory(navigationData);

  return {
    headerTitle,
  };
};

export default CategoriesMealScreen;
