import React, { FC, useCallback, useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationScreenProp } from 'react-navigation';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch, useSelector } from 'react-redux';
import CustomHeaderButton from '../components/HeaderButton';
import { OPEN_SANS_BOLD } from '../constants/fonts';
import Meal from '../models/meal';
import { toggleFavorite } from '../store/actions/meals.action';
import RootState from '../store/rootState.model';
import { deviceWidth, globalStyles } from '../utils/utilityFunctions';

interface MealDetailsScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

interface NavStatelessComponent extends FC<MealDetailsScreenProps> {
  navigationOptions?: Object;
}

const renderTextItem = (item: string) => (
  <Text
    key={item}
    style={{
      ...globalStyles.text,
      marginVertical: 10,
      marginHorizontal: 20,
      borderColor: '#ccc',
      borderWidth: 1,
      padding: 10,
    }}
  >
    {item}
  </Text>
);

const MealDetailsScreen: NavStatelessComponent = (props) => {
  const meal: Meal = props.navigation.getParam('meal');
  const favoriteMeals = useSelector((state: RootState) => state.meals.favoriteMeals);
  const isFavorite = favoriteMeals.some((favMeal) => meal.id === favMeal.id);

  const dispatch = useDispatch();

  const toggleDispatch = useCallback(() => {
    dispatch(toggleFavorite(meal));
  }, [dispatch, meal]);

  useEffect(() => {
    props.navigation.setParams({ toggleDispatch, isFavorite });
  }, [meal, isFavorite]);

  return (
    <ScrollView>
      <Image source={{ uri: meal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <Text style={globalStyles.text}>{meal.duration} M</Text>
        <Text style={globalStyles.text}>{meal.complexity.toUpperCase()}</Text>
        <Text style={globalStyles.text}>{meal.affordability.toUpperCase()}</Text>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {meal.ingredients.map(renderTextItem)}
      <Text style={styles.title}>Steps</Text>
      {meal.steps.map(renderTextItem)}
    </ScrollView>
  );
};

MealDetailsScreen.navigationOptions = (details: MealDetailsScreenProps) => {
  const meal = details.navigation.getParam('meal');
  const isFavorite = details.navigation.getParam('isFavorite');
  const toggleDispatch = details.navigation.getParam('toggleDispatch');
  const iconName = isFavorite ? 'ios-star' : 'ios-star-outline';

  const { title: headerTitle } = meal;
  return {
    headerTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item title="Favouite" onPress={toggleDispatch} iconName={iconName} />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  title: {
    fontFamily: OPEN_SANS_BOLD,
    fontSize: 22,
    textAlign: 'center',
  },
  details: {
    flexDirection: 'row',
    padding: 15,
    justifyContent: 'space-around',
  },
  image: { width: '100%', height: deviceWidth / 4 },
});

export default MealDetailsScreen;
