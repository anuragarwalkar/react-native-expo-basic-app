import React, { FC } from 'react';
import { Button, Image, StyleSheet, Text, View } from 'react-native';
import Product from '../models/product.model';

interface ProductItemProps {
  product: Product;
}
const ProductItem: FC<ProductItemProps> = ({ product }) => {
  const onCartPress = () => {};

  const onViewDetailsPress = () => {};
  return (
    <View style={styles.container}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <Text>{product.title}</Text>
      <Text>{product.price}</Text>
      <View style={styles.buttons}>
        <Button title="View Details" onPress={onViewDetailsPress} />
        <Button title="To Cart" onPress={onCartPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { padding: 20 },
  image: { width: '100%', height: 200 },
  buttons: { flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' },
});

export default ProductItem;
