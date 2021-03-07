import React from 'react';
import { Button, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import { DrawerNavigatorItems } from 'react-navigation-drawer';
import { useDispatch } from 'react-redux';
import Colors from '../../constants/Colors';
import { logout } from '../../store/actions/auth.actions';

const Logout: any = (props: any) => {
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    props.navigation.navigate('Auth');
  };
  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
        <DrawerNavigatorItems {...props} />
        <View style={{ padding: 20, alignItems: 'center' }}>
          <View style={{ width: 150 }}>
            <Button title="Logout" onPress={onLogout} color={Colors.primary} />
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default Logout;

const styles = StyleSheet.create({});
