import React, { FC } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import Meal from '../models/meal';

interface MealItemProps {
  onSelectMeal: (meal: Meal) => void;
  meal: Meal;
}

const MealItem: FC<MealItemProps> = (props) => {
  return (
    <TouchableOpacity style={styles.mealsItem} onPress={() => props.onSelectMeal(props.meal)}>
      <View>
        <View style={{ ...styles.mealRow, ...styles.mealHeader }}>
          <ImageBackground style={styles.imageBackground} source={{ uri: props.meal.imageUrl }}>
            <Text style={styles.text}>{props.meal.title}</Text>
          </ImageBackground>
        </View>
        <View style={{ ...styles.mealRow, ...styles.mealDetails }}>
          <Text>{props.meal.duration} M</Text>
          <Text>{props.meal.complexity.toUpperCase()}</Text>
          <Text>{props.meal.affordability.toUpperCase()}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mealRow: {
    flexDirection: 'row',
  },
  mealsItem: {
    height: 200,
    width: '100%',
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    overflow: 'hidden',
  },
  mealHeader: {
    height: '85%',
  },
  mealDetails: {
    alignItems: 'center',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    height: '15%',
  },
  imageBackground: { width: '100%', justifyContent: 'flex-end', height: '100%' },
  text: {
    fontFamily: 'open-sans-bold',
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.5)',
    fontSize: 22,
    paddingHorizontal: 12,
    textAlign: 'center',
  },
});

export default MealItem;
