import React, { FC, useCallback, useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationScreenProp } from 'react-navigation';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useDispatch } from 'react-redux';
import CustomSwitch from '../components/CustomSwitch';
import HeaderButton from '../components/HeaderButton';
import { OPEN_SANS_BOLD } from '../constants/fonts';
import MealFilters from '../models/mealFilters.model';
import { setFilters } from '../store/actions/meals.action';

interface FilterScreenProps {
  onSavePress: () => void;
  navigation: NavigationScreenProp<any, any>;
}
interface FilterScreenComp extends FC<FilterScreenProps> {
  navigationOptions?: Object;
}
const FiltersScreen: FilterScreenComp = ({ navigation }) => {
  const [isGluteenFree, setIsGluteenFree] = useState(false);
  const [isLactosFree, setIsLactosFree] = useState(false);
  const [isVegan, setIsVegan] = useState(false);
  const [isVegiterian, setIsVegiterian] = useState(false);
  const dispatch = useDispatch();

  const saveFilter = useCallback(() => {
    const appliedFilter: MealFilters = {
      isGluteenFree,
      isLactosFree,
      isVegan,
      isVegiterian,
    };
    dispatch(setFilters(appliedFilter));
  }, [isGluteenFree, isLactosFree, isVegan, isVegiterian]);

  useEffect(() => {
    navigation.setParams({ saveFilter });
  }, [saveFilter]);

  return (
    <View style={styles.screen}>
      <Text style={styles.title}>Available Filters/Restrictions</Text>
      <CustomSwitch text="Gluten-free" switchState={isGluteenFree} setSwitchState={setIsGluteenFree} />
      <CustomSwitch text="Lactose-free" switchState={isLactosFree} setSwitchState={setIsLactosFree} />
      <CustomSwitch text="Vegan" switchState={isVegan} setSwitchState={setIsVegan} />
      <CustomSwitch text="Vegiterian" switchState={isVegiterian} setSwitchState={setIsVegiterian} />
    </View>
  );
};

FiltersScreen.navigationOptions = (navData: any) => {
  return {
    headerTitle: 'Filters',
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
    headerRight: () => {
      const saveFilter = navData.navigation.getParam('saveFilter');
      return (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item title="Menu" iconName="ios-save" onPress={() => saveFilter()} />
        </HeaderButtons>
      );
    },
  };
};

const styles = StyleSheet.create({
  screen: {
    padding: 25,
  },
  title: {
    fontFamily: OPEN_SANS_BOLD,
    fontSize: 22,
    margin: 20,
    textAlign: 'center',
  },
});

export default FiltersScreen;
