import { Ionicons } from '@expo/vector-icons';
import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { OPEN_SANS, OPEN_SANS_BOLD } from '../../constants/Fonts';
import CartItemModel from '../../models/CartItem';
import { isAndroid } from '../../utils/utilityFunctions';

interface CartItemProps {
  item: CartItemModel;
  onRemove: () => void;
}
const CartItem: FC<CartItemProps> = ({ item, onRemove }) => {
  return (
    <View style={styles.cartItem}>
      <Text style={styles.cartData}>
        <Text style={styles.quantity}>{item.quantity}</Text> <Text style={styles.title}>{item.productTitle}</Text>
      </Text>
      <View style={styles.cartData}>
        <Text style={styles.amount}>${item.sum}</Text>
        <TouchableOpacity style={styles.deleteButton} onPress={onRemove}>
          <Ionicons name={isAndroid ? 'md-trash' : 'ios-trash'} size={23} color={'red'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    marginLeft: 20,
  },
  cartItem: {
    padding: 10,
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  cartData: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    fontFamily: OPEN_SANS_BOLD,
    fontSize: 16,
  },
  quantity: {
    fontFamily: OPEN_SANS,
    color: '#888',
    fontSize: 16,
  },
  amount: {
    fontFamily: OPEN_SANS_BOLD,
    fontSize: 16,
  },
});

export default CartItem;
