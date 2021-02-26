import React, { FC } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import Meal from '../models/meal';
import MealItem from './MealItem';

interface MealListProps {
  data: Meal[];
  navigation: NavigationScreenProp<any, any>;
}
const MealList: FC<MealListProps> = (props) => {
  const onSelectMeal = (meal: Meal) => {
    props.navigation.navigate({ routeName: 'MealDetails', params: { meal } });
  };
  const renderMealItems = ({ item }: { item: Meal }) => <MealItem meal={item} onSelectMeal={onSelectMeal} />;
  return (
    <View style={styles.screen}>
      <FlatList
        style={styles.fullWidth}
        data={props.data}
        keyExtractor={(item, index) => item.id}
        renderItem={renderMealItems}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  fullWidth: {
    width: '100%',
  },
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
});

export default MealList;
