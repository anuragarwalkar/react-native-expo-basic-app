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
    <View style={{ padding: 20 }}>
      <Image source={{ uri: product.imageUrl }} style={{ width: '100%', height: 200 }} />
      <Text>{product.title}</Text>
      <Text>{product.price}</Text>
      <View style={{ flexDirection: 'row', marginTop: 10, justifyContent: 'space-between' }}>
        <Button title="View Details" onPress={onViewDetailsPress} />
        <Button title="To Cart" onPress={onCartPress} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});

export default ProductItem;
