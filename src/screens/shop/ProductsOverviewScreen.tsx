import React from 'react';
import { Button, FlatList } from 'react-native';
import { NavigationStackScreenComponent } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import CustomMenu from '../../components/UI/CustomMenu';
import Colors from '../../constants/Colors';
import Product from '../../models/Product.class';
import { addToCart } from '../../store/actions/cart.actions';
import RootState from '../../store/rootState.model';

const ProductsOverviewScreen: NavigationStackScreenComponent = ({ navigation }) => {
  const availableProducts = useSelector((state: RootState) => state.products.availableProducts);
  const dispatch = useDispatch();
  const onViewDetails = ({ id: productId, title: productTitle }: Product) => {
    navigation.navigate({ routeName: 'ProductDetails', params: { productId, productTitle } });
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

ProductsOverviewScreen.navigationOptions = (navData) => {
  const toggleDrawer = (navData.navigation as any).toggleDrawer;
  return {
    headerRight: () => (
      <CustomMenu title="Cart" icon="cart" onPress={() => navData.navigation.navigate({ routeName: 'Cart' })} />
    ),
    headerLeft: () => <CustomMenu title="Menu" icon="menu" onPress={toggleDrawer} />,
  };
};

export default ProductsOverviewScreen;
