import React from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { NavigationComponent } from 'react-navigation';
import { useSelector } from 'react-redux';
import CustomMenu from '../../components/UI/CustomMenu';
import RootState from '../../store/rootState.model';
import OrderItem from './OrderItem';

const OrdersScreen: NavigationComponent<{}, {}> = () => {
  const orders = useSelector((state: RootState) => state.orders.orders);
  return <FlatList data={orders} renderItem={(itemData) => <OrderItem item={itemData.item} />} />;
};

OrdersScreen.navigationOptions = (navOptions: any) => {
  const toggleDrawer = navOptions.navigation.toggleDrawer;
  return {
    headerLeft: () => <CustomMenu title="Menu" icon="menu" onPress={toggleDrawer} />,
  };
};

export default OrdersScreen;
