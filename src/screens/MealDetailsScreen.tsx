import React, { FC } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { NavigationScreenProp } from 'react-navigation';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';
import { OPEN_SANS_BOLD } from '../constants/fonts';
import Meal from '../models/meal';
import { defaultTextStyle, deviceWidth } from '../utils/utilityFunctions';

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
      ...defaultTextStyle.text,
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
  return (
    <ScrollView>
      <Image source={{ uri: meal.imageUrl }} style={styles.image} />
      <View style={styles.details}>
        <Text style={defaultTextStyle.text}>{meal.duration} M</Text>
        <Text style={defaultTextStyle.text}>{meal.complexity.toUpperCase()}</Text>
        <Text style={defaultTextStyle.text}>{meal.affordability.toUpperCase()}</Text>
      </View>
      <Text style={styles.title}>Ingredients</Text>
      {meal.ingredients.map(renderTextItem)}
      <Text style={styles.title}>Steps</Text>
      {meal.steps.map(renderTextItem)}
    </ScrollView>
  );
};

MealDetailsScreen.navigationOptions = (details: MealDetailsScreenProps) => {
  const { title: headerTitle } = details.navigation.getParam('meal');
  return {
    headerTitle,
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="Favouite"
          onPress={() => {
            console.log('arnold');
          }}
          iconName="ios-star"
        />
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
