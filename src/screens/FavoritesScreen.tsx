import React, { FC } from 'react';
import { NavigationScreenProp } from 'react-navigation';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import MealList from '../components/MealList';
import { MEALS } from '../data/dummy';
interface FavoritesScreenProps {
  navigation: NavigationScreenProp<any, any>;
}
interface FavoriteScreenType extends FC<FavoritesScreenProps> {
  navigationOptions?: Object;
}
const FavoritesScreen: FavoriteScreenType = (props) => {
  return <MealList data={MEALS} navigation={props.navigation} />;
};

FavoritesScreen.navigationOptions = (navData: any) => {
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

export default FavoritesScreen;
