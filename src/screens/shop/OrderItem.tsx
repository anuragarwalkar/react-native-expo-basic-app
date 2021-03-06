import React, { FC, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import Card from '../../components/shop/Card';
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
    <Card style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${item.totalAmount}</Text>
        <Text style={styles.date}>{item.getReadableDate()}</Text>
      </View>
      <View style={globalStyles.absuluteCenter}>
        <View style={{ width: 140 }}>
          <Button
            color={Colors.primary}
            title={showDetails ? 'Hide Details' : 'Show Details'}
            onPress={onShowDetails}
          />
        </View>
      </View>
      {showDetails && (
        <View style={styles.fullWidth}>
          {item.items.map((cartItem) => {
            return <CartItem key={cartItem.id} item={cartItem} onRemove={() => {}} />;
          })}
        </View>
      )}
    </Card>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    paddingBottom: 10,
    margin: 20,
    padding: 15,
  },
  fullWidth: { width: '100%' },
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
