import React, { FC } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';

interface CategoriesMealScreenProps {
  navigation: NavigationScreenProp<any, any>;
}
const CategoriesMealScreen: FC<CategoriesMealScreenProps> = (props) => {
  return (
    <View style={styles.screen}>
      <Text>The Categories Meal Screen</Text>
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default CategoriesMealScreen;
