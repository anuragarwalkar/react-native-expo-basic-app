import React from 'react';
import { Button, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import CustomMenu from '../../components/UI/CustomMenu';
import Colors from '../../constants/Colors';
import Product from '../../models/Product.class';
import { addToCart } from '../../store/actions/cart.actions';
import RootState from '../../store/rootState.model';

const ProductsOverviewScreen = ({ navigation }: any) => {
  const availableProducts = useSelector((state: RootState) => state.products.availableProducts);
  const dispatch = useDispatch();
  const onViewDetails = ({ id: productId, title: productTitle }: Product) => {
    navigation.navigate({ name: 'ProductDetails', params: { productId, productTitle } });
  };
  const onAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };
  return (
    <FlatList
      data={availableProducts}
      renderItem={(product) => (
        <ProductItem viewDetails={() => onViewDetails(product.item)} product={product.item}>
          <Button color={Colors.primary} title="View Details" onPress={() => onViewDetails(product.item)} />
          <Button color={Colors.primary} title="To Cart" onPress={() => onAddToCart(product.item)} />
        </ProductItem>
      )}
    />
  );
};

export const productsNavigationOptions = (navData: any) => {
  const toggleDrawer = navData.navigation.toggleDrawer;
  return {
    headerRight: () => (
      <CustomMenu title="Cart" icon="cart" onPress={() => navData.navigation.navigate({ name: 'Cart' })} />
    ),
    headerLeft: () => <CustomMenu title="Menu" icon="menu" onPress={toggleDrawer} />,
  };
};

export default ProductsOverviewScreen;
