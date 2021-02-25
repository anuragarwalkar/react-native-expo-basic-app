import React, { FunctionComponent } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { CATEGORIES } from '../data/dummy';
import Category from '../models/category';

interface CategoriesScreenProps {
  navigation: NavigationScreenProp<any, any>;
}
interface NavStatelessComponent extends FunctionComponent<CategoriesScreenProps> {
  navigationOptions?: Object;
}
const CategoriesScreen: NavStatelessComponent = (props) => {
  const rednerGridItem = ({ item }: { item: Category }) => {
    return (
      <TouchableOpacity
        style={styles.gridItem}
        onPress={() => {
          props.navigation.navigate({
            routeName: 'CategoriesMeals',
            params: {
              categoryId: item.id,
            },
          });
        }}
      >
        <View>
          <Text>{item.title}</Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList numColumns={2} data={CATEGORIES} keyExtractor={(item, index) => item.id} renderItem={rednerGridItem} />
  );
};

CategoriesScreen.navigationOptions = {
  headerTitle: 'Meal Categories',
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gridItem: {
    flex: 1,
    margin: 15,
    height: 140,
  },
});

export default CategoriesScreen;
