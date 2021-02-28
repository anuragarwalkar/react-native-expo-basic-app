import React from 'react';
import { StyleSheet, Switch, Text, View } from 'react-native';
import colors from '../constants/colors';
import { isAndroid } from '../utils/utilityFunctions';

const CustomSwitch = ({
  text,
  switchState,
  setSwitchState,
}: {
  text: string;
  switchState: boolean;
  setSwitchState: (value: boolean) => void;
}) => {
  return (
    <View style={styles.filterContainer}>
      <Text>{text}</Text>
      <Switch
        trackColor={{ true: colors.primaryColor, false: '' }}
        thumbColor={isAndroid() ? colors.primaryColor : ''}
        onValueChange={(newValue) => setSwitchState(newValue)}
        value={switchState}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  filterContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 15,
  },
});

export default CustomSwitch;
