import React from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import CartItem from '../../components/shop/CartItem';
import Colors from '../../constants/Colors';
import { OPEN_SANS_BOLD } from '../../constants/Fonts';
import { removeFromCart } from '../../store/actions/cart.actions';
import { addOrder } from '../../store/actions/order.actions';
import RootState from '../../store/rootState.model';

const CartScreen = () => {
  const { totalAmount, items } = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const onOderNowPress = () => {
    dispatch(addOrder(items, totalAmount));
  };

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total: <Text style={styles.amount}>${totalAmount}</Text>
        </Text>
        <Button color={Colors.accent} disabled={items.length === 0} title="Order Now" onPress={onOderNowPress} />
      </View>
      <View>
        <FlatList
          data={items}
          renderItem={(cartItem) => (
            <CartItem
              deletable
              onRemove={() => {
                dispatch(removeFromCart(cartItem.item.id));
              }}
              item={cartItem.item}
            />
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
    shadowColor: 'black',
    paddingBottom: 10,
    shadowOpacity: 0.26,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowRadius: 8,
    elevation: 5,
    borderRadius: 10,
    backgroundColor: 'white',
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
