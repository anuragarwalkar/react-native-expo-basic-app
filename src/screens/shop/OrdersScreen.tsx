import React, { useEffect } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import { NavigationComponent } from 'react-navigation';
import { NavigationStackProp } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import CustomMenu from '../../components/UI/CustomMenu';
import { fetchOrders } from '../../store/actions/order.actions';
import RootState from '../../store/rootState.model';
import OrderItem from './OrderItem';

type Props = {
  navigation: NavigationStackProp<{}>;
};

const OrdersScreen: NavigationComponent<{}, {}> = (props: Props) => {
  const orders = useSelector((state: RootState) => state.orders.orders);
  const dispatch: any = useDispatch();
  useEffect(() => {
    (async () => {
      try {
        await dispatch(fetchOrders());
      } catch (error) {
        console.log('error:', error.message);
      }
    })();
  }, []);
  return <FlatList data={orders} renderItem={(itemData) => <OrderItem item={itemData.item} />} />;
};

OrdersScreen.navigationOptions = (navOptions: any) => {
  const toggleDrawer = navOptions.navigation.toggleDrawer;
  return {
    headerLeft: () => <CustomMenu title="Menu" icon="menu" onPress={toggleDrawer} />,
  };
};

export default OrdersScreen;
