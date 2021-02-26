import React, { FunctionComponent } from 'react';
import { FlatList, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { NavigationScreenProp } from 'react-navigation';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import { CATEGORIES } from '../data/dummy';
import Category from '../models/category';
import { isAndroid } from '../utils/utilityFunctions';

enableScreens();
interface CategoriesScreenProps {
  navigation: NavigationScreenProp<any, any>;
}
interface NavStatelessComponent extends FunctionComponent<CategoriesScreenProps> {
  navigationOptions?: Object;
}
const CategoriesScreen: NavStatelessComponent = (props) => {
  const rednerGridItem = ({ item }: { item: Category }) => {
    let TouchableComponent: any = TouchableOpacity;

    if (isAndroid()) {
      TouchableComponent = TouchableNativeFeedback;
    }
    return (
      <View style={styles.gridItem}>
        <TouchableComponent
          style={{ flex: 1 }}
          onPress={() => {
            props.navigation.navigate({
              routeName: 'CategoriesMeals',
              params: {
                categoryId: item.id,
              },
            });
          }}
        >
          <View style={{ ...styles.container, ...{ backgroundColor: item.color } }}>
            <Text style={styles.title} numberOfLines={2}>
              {item.title}
            </Text>
          </View>
        </TouchableComponent>
      </View>
    );
  };
  return (
    <FlatList numColumns={2} data={CATEGORIES} keyExtractor={(item, index) => item.id} renderItem={rednerGridItem} />
  );
};

CategoriesScreen.navigationOptions = (navData: any) => {
  return {
    headerTitle: 'Meal Categories',
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Menu"
          iconName="ios-menu"
          onPress={() => {
            navData.navigation.openDrawer();
          }}
        />
      </HeaderButtons>
    ),
  };
};

const styles = StyleSheet.create({
  gridItem: {
    flex: 1,
    margin: 15,
    height: 150,
    borderRadius: 10,
    overflow: 'hidden',
  },
  container: {
    flex: 1,
    borderRadius: 10,
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 10,
    elevation: 3,
    padding: 15,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 22,
    textAlign: 'right',
  },
});

export default CategoriesScreen;
