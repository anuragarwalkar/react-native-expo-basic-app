import React, { FC } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

interface CategoriesScreenProps {
  navigation: NavigationScreenProp<any, any>;
}
const CategoriesScreen: FC<CategoriesScreenProps> = (props) => {
  return (
    <View style={styles.screen}>
      <Text>The Categories screen</Text>
      <Button
        title="Go to meals"
        onPress={() => {
          props.navigation.navigate({
            routeName: 'CategoriesMeals',
          });
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoriesScreen;
