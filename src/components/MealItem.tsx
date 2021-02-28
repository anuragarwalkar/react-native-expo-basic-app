import React, { FC } from 'react';
import { ImageBackground, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { OPEN_SANS_BOLD } from '../constants/fonts';
import Meal from '../models/meal';
import { globalStyles } from '../utils/utilityFunctions';

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
          <Text style={globalStyles.text}>{props.meal.duration} M</Text>
          <Text style={globalStyles.text}>{props.meal.complexity.toUpperCase()}</Text>
          <Text style={globalStyles.text}>{props.meal.affordability.toUpperCase()}</Text>
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
    fontFamily: OPEN_SANS_BOLD,
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.5)',
    fontSize: 22,
    paddingHorizontal: 12,
    textAlign: 'center',
  },
});

export default MealItem;
