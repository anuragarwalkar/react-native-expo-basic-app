import React, { FC, useEffect } from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { useDispatch } from 'react-redux';
import { authenticate } from '../../store/actions/auth.actions';
import globalStyles from '../../utils/globalStyles';
import { deviceStorage } from '../../utils/utilityFunctions';

type Props = {
  navigation: NavigationStackProp<{}>;
};
const StartupScreen: FC<Props> = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    deviceStorage()
      .getUser()
      .then((res) => {
        if (res) {
          const { expiresIn } = res;
          const expirationDate = expiresIn;
          if (new Date(expirationDate) <= new Date()) {
            deviceStorage().clearUser();
            props.navigation.navigate('Auth');
          } else {
            dispatch(authenticate(res));
            props.navigation.navigate('Shop');
          }
        } else {
          props.navigation.navigate('Auth');
        }
      });
  }, []);

  return (
    <View style={globalStyles.absuluteCenter}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default StartupScreen;

const styles = StyleSheet.create({});
