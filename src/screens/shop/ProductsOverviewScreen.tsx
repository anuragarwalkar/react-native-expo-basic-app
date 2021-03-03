import React from 'react';
import { FlatList } from 'react-native';
import { NavigationComponent } from 'react-navigation';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { NavigationStackProp } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import CustomHeaderButton from '../../components/UI/HeaderButton';
import Product from '../../models/Product.class';
import { addToCart } from '../../store/actions/cart.actions';
import RootState from '../../store/rootState.model';
import { isAndroid } from '../../utils/utilityFunctions';

type ProductsOverviewScreenProps = {};

type Props = {
  navigation: NavigationStackProp<ProductsOverviewScreenProps>;
};

const ProductsOverviewScreen: NavigationComponent<{}, {}> = ({ navigation }: Props) => {
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
        <ProductItem
          viewDetails={() => onViewDetails(product.item)}
          addToCart={() => onAddToCart(product.item)}
          product={product.item}
        />
      )}
    />
  );
};

ProductsOverviewScreen.navigationOptions = (navData: Props) => {
  return {
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
        <Item
          title="cart"
          iconName={isAndroid ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate({ routeName: 'Cart' });
          }}
        ></Item>
      </HeaderButtons>
    ),
  };
};

export default ProductsOverviewScreen;
