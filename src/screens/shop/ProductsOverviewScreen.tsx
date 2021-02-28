import React, { FC } from 'react';
import { FlatList } from 'react-native';
import { NavigationStackProp } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/ProductItem';
import Product from '../../models/product.model';
import { addToCart } from '../../store/actions/cart.actions';
import RootState from '../../store/rootState.model';

type ProductsOverviewScreenProps = {};

type Props = {
  navigation: NavigationStackProp<ProductsOverviewScreenProps>;
};

const ProductsOverviewScreen: FC<Props> = ({ navigation }) => {
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

export default ProductsOverviewScreen;
