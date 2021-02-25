import React, { FC } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { CATEGORIES, MEALS } from '../data/dummy';
import Category from '../models/category';
import { enableScreens } from 'react-native-screens';
import Meal from '../models/meal';
import MealItem from '../components/MealItem';

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
  const onSelectMeal = (meal: Meal) => {
    props.navigation.navigate({ routeName: 'MealDetails', params: { meal } });
  };
  const renderMealItems = ({ item }: { item: Meal }) => <MealItem meal={item} onSelectMeal={onSelectMeal} />;
  const filteredMeals = MEALS.filter((meal: Meal) => meal.categoryIds.indexOf(selectedCategoryId) >= 0);
  const displayedMeals = filteredMeals ? filteredMeals : [];

  return (
    <View style={styles.screen}>
      <FlatList
        style={styles.fullWidth}
        data={displayedMeals}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItems}
      />
    </View>
  );
};

CategoriesMealScreen.navigationOptions = (navigationData: CategoriesMealScreenProps) => {
  const { title: headerTitle } = getSelectedCategory(navigationData);

  return {
    headerTitle,
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  fullWidth: {
    width: '100%',
  },
});

export default CategoriesMealScreen;
