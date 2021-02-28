import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector } from 'react-redux';
import HeaderButton from '../components/HeaderButton';
import MealList from '../components/MealList';
import RootState from '../store/rootState.model';
import { globalStyles } from '../utils/utilityFunctions';
interface FavoritesScreenProps {
  navigation: NavigationScreenProp<any, any>;
}
interface FavoriteScreenType extends FC<FavoritesScreenProps> {
  navigationOptions?: Object;
}
const FavoritesScreen: FavoriteScreenType = (props) => {
  const mealsData = useSelector((state: RootState) => state.meals.favoriteMeals);
  if (mealsData.length === 0) {
    return (
      <View style={globalStyles.absuluteCenter}>
        <Text style={styles.headerText}>No Favorite Meal Found. Start Adding Some!!!</Text>
      </View>
    );
  }
  return <MealList data={mealsData} navigation={props.navigation} />;
};

FavoritesScreen.navigationOptions = (navData: any) => {
  return {
    headerTitle: 'Your Favorites',
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
  headerText: {
    fontFamily: 'open-sans',
    fontSize: 17,
  },
});

export default FavoritesScreen;
