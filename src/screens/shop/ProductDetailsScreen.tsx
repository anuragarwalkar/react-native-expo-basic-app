import React from 'react';
import { Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../../constants/Colors';
import Product from '../../models/Product.class';
import { addToCart } from '../../store/actions/cart.actions';
import RootState from '../../store/rootState.model';

const ProductDetailsScreen: NavigationStackScreenComponent = (props) => {
  const productId = props.navigation.getParam('productId');
  const product = useSelector((state: RootState) =>
    state.products.availableProducts.find((prod) => productId === prod.id)
  );

  const dispatch = useDispatch();

  const onAddToCart = () => {
    dispatch(addToCart(product as Product));
  };

  return (
    <ScrollView>
      <Image style={styles.image} source={{ uri: product?.imageUrl }} />
      <View style={styles.buttonContainer}>
        <View style={styles.button}>
          <Button color={Colors.primary} title="Add to cart" onPress={onAddToCart} />
        </View>
      </View>
      <Text style={styles.price}>${product?.price.toFixed(2)}</Text>
      <Text style={styles.description}>{product?.description}</Text>
    </ScrollView>
  );
};

ProductDetailsScreen.navigationOptions = (props) => {
  const headerTitle = props.navigation.getParam('productTitle');

  return {
    headerTitle,
  };
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 300,
  },
  price: {
    fontSize: 20,
    color: '#888',
    textAlign: 'center',
    marginVertical: 20,
  },
  description: {
    fontSize: 14,
    textAlign: 'center',
  },
  button: {
    width: 150,
    marginVertical: 10,
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default ProductDetailsScreen;
