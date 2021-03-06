import React, { useState } from 'react';
import { ActivityIndicator, Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { NavigationComponent } from 'react-navigation';
import { NavigationStackProp } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import Card from '../../components/shop/Card';
import CartItem from '../../components/shop/CartItem';
import Colors from '../../constants/Colors';
import { OPEN_SANS_BOLD } from '../../constants/Fonts';
import { removeFromCart } from '../../store/actions/cart.actions';
import { addOrder } from '../../store/actions/order.actions';
import RootState from '../../store/rootState.model';
import globalStyles from '../../utils/globalStyles';

type Props = {
  navigation: NavigationStackProp<{}>;
};

const CartScreen: NavigationComponent<{}, {}> = (props: Props) => {
  const { totalAmount, items } = useSelector((state: RootState) => state.cart);
  const dispatch: any = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const onOderNowPress = async () => {
    setIsLoading(true);
    await dispatch(addOrder(items, totalAmount));
    setIsLoading(false);
    props.navigation.navigate({ routeName: 'Orders' });
  };

  const onRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  if (isLoading) {
    return (
      <View style={globalStyles.absuluteCenter}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Card style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${totalAmount}</Text>
        </Text>
        <Button color={Colors.accent} disabled={items.length === 0} title="Order Now" onPress={onOderNowPress} />
      </Card>
      <View>
        <FlatList
          data={items}
          renderItem={(cartItem) => (
            <CartItem deletable onRemove={() => onRemove(cartItem.item.id)} item={cartItem.item} />
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    padding: 10,
  },
  summaryText: {
    fontFamily: OPEN_SANS_BOLD,
    fontSize: 18,
  },
  amount: {
    color: Colors.primary,
  },
});

export default CartScreen;
