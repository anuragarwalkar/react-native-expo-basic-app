import React from 'react';
import { FlatList } from 'react-native';
import { NavigationComponent } from 'react-navigation';
import { NavigationStackProp } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import CustomMenu from '../../components/UI/CustomMenu';
import Product from '../../models/Product.class';
import { addToCart } from '../../store/actions/cart.actions';
import RootState from '../../store/rootState.model';

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

ProductsOverviewScreen.navigationOptions = (navData: any) => {
  const toggleDrawer = navData.navigation.toggleDrawer;
  return {
    headerRight: () => (
      <CustomMenu title="Cart" icon="cart" onPress={() => navData.navigation.navigate({ routeName: 'Cart' })} />
    ),
    headerLeft: () => <CustomMenu title="Menu" icon="menu" onPress={toggleDrawer} />,
  };
};

export default ProductsOverviewScreen;
