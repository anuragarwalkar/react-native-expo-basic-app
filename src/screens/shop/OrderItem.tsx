import React, { FC, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import CartItem from '../../components/shop/CartItem';
import Colors from '../../constants/Colors';
import { OPEN_SANS, OPEN_SANS_BOLD } from '../../constants/Fonts';
import Order from '../../models/Order.class';
import globalStyles from '../../utils/globalStyles';

const OrderItem: FC<{ item: Order }> = ({ item }) => {
  const [showDetails, setShowDetails] = useState(false);

  const onShowDetails = () => {
    setShowDetails((oldState) => !oldState);
  };

  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${item.totalAmount}</Text>
        <Text style={styles.date}>{item.getReadableDate()}</Text>
      </View>
      <View style={globalStyles.absuluteCenter}>
        <View style={{ width: 140 }}>
          <Button color={Colors.primary} title="Show Details" onPress={onShowDetails} />
        </View>
      </View>
      {showDetails && (
        <View>
          {item.items.map((cartItem) => {
            return <CartItem key={cartItem.id} item={cartItem} onRemove={() => {}} />;
          })}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
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
    margin: 20,
    padding: 15,
  },
  summary: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
  },
  totalAmount: {
    fontFamily: OPEN_SANS_BOLD,
  },
  date: {
    fontSize: 16,
    fontFamily: OPEN_SANS,
    color: '#888',
  },
});

export default OrderItem;
