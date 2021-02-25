import React, { FunctionComponent } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { CATEGORIES } from '../data/dummy';
import Category from '../models/category';
import { enableScreens } from 'react-native-screens';

enableScreens();
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
        style={{ ...styles.gridItem, backgroundColor: item.color }}
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
          <Text style={styles.text} numberOfLines={2}>
            {item.title}
          </Text>
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
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 10,
    elevation: 3,
    padding: 10,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  text: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'right',
  },
});

export default CategoriesScreen;
