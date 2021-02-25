import React, { FC } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

interface MealDetailsScreenProps {
  navigation: any;
}

const MealDetailsScreen: FC<MealDetailsScreenProps> = (props) => {
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

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default MealDetailsScreen;
