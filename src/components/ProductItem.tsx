import React from 'react';
import { Button, Image, StyleSheet, Text, TouchableNativeFeedback, TouchableOpacity, View } from 'react-native';
import { NavigationScreenComponent } from 'react-navigation';
import Colors from '../constants/Colors';
import { OPEN_SANS, OPEN_SANS_BOLD } from '../constants/Fonts';
import Product from '../models/product.model';
import { isAndroid } from '../utils/utilityFunctions';

interface ProductItemProps {
  product: Product;
  viewDetails: () => void;
  addToCart: () => void;
}

const ProductItem: NavigationScreenComponent<{}, ProductItemProps> = ({ product, viewDetails, addToCart }) => {
  const products = (
    <View style={styles.container}>
      <Image source={{ uri: product.imageUrl }} style={styles.image} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
      <View style={styles.buttons}>
        <Button color={Colors.primary} title="View Details" onPress={viewDetails} />
        <Button color={Colors.primary} title="To Cart" onPress={addToCart} />
      </View>
    </View>
  );

  let content = <TouchableOpacity onPress={viewDetails}>{products}</TouchableOpacity>;

  if (isAndroid) {
    content = (
      <TouchableNativeFeedback useForeground onPress={viewDetails}>
        {products}
      </TouchableNativeFeedback>
    );
  }
  return content;
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    margin: 10,
    height: 300,
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
  image: { width: '100%', height: '60%' },
  buttons: {
    height: '25%',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  title: {
    fontFamily: OPEN_SANS_BOLD,
    fontSize: 18,
    marginVertical: 2,
  },
  price: {
    fontSize: 14,
    color: '#888',
    fontFamily: OPEN_SANS,
  },
  textContainer: {
    alignItems: 'center',
    height: '15%',
  },
});

export default ProductItem;
