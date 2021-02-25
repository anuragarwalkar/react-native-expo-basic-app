import React, { FC } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import CustomHeaderButton from '../components/HeaderButton';

interface MealDetailsScreenProps {
  navigation: any;
}

interface NavStatelessComponent extends FC<MealDetailsScreenProps> {
  navigationOptions?: Object;
}

const MealDetailsScreen: NavStatelessComponent = (props) => {
  return (
    <View style={styles.screen}>
      <Text>The Meal details screen</Text>
      <Button
        title="Go back to Categories"
        onPress={() => {
          props.navigation.popToTop();
        }}
      />
    </View>
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
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MealDetailsScreen;
