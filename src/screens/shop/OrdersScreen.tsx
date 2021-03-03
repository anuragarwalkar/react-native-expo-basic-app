import React from 'react';
import { Text } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { useSelector } from 'react-redux';
import RootState from '../../store/rootState.model';

const OrdersScreen = () => {
  const orders = useSelector((state: RootState) => state.orders.orders);
  return <FlatList data={orders} renderItem={(itemData) => <Text>{itemData.item.totalAmount}</Text>} />;
};

export default OrdersScreen;
