import React, { FC } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { CATEGORIES } from '../data/dummy';
import Category from '../models/category';

interface CategoriesMealScreenProps {
  navigation: NavigationScreenProp<any, any>;
}

interface NavStatelessComponent extends FC<CategoriesMealScreenProps> {
  navigationOptions?: Object;
}

const getSelectedCategory = (props: CategoriesMealScreenProps): Category => {
  const categoryId = props.navigation.getParam('categoryId');
  const selectedCategory = CATEGORIES.find((cat) => cat.id === categoryId);
  return selectedCategory ? selectedCategory : new Category('', '', '');
};
const CategoriesMealScreen: NavStatelessComponent = (props) => {
  const selectedCategory = getSelectedCategory(props);
  return (
    <View style={styles.screen}>
      <Text>The Categories {selectedCategory?.title} Meal Screen</Text>
      <Button
        title="Go to meal details"
        onPress={() => {
          props.navigation.navigate({
            routeName: 'MealDetails',
          });
        }}
      />
      <View style={{ width: 100, marginTop: 20 }}>
        <Button
          color="green"
          title="Go Back"
          onPress={() => {
            props.navigation.goBack();
          }}
        />
      </View>
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
  },
});

export default CategoriesMealScreen;
