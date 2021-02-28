import React from 'react';
import { FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import ProductItem from '../../components/ProductItem';
import RootState from '../../store/rootState.mode';

const ProductsOverviewScreen = () => {
  const availableProducts = useSelector((state: RootState) => state.products.availableProducts);
  return <FlatList data={availableProducts} renderItem={(product) => <ProductItem product={product.item} />} />;
};

export default ProductsOverviewScreen;
