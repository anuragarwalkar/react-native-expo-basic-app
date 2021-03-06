import React, { useEffect, useState } from 'react';
import { ActivityIndicator, Button, FlatList, Text, View } from 'react-native';
import { NavigationComponent } from 'react-navigation';
import { NavigationStackProp } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import CustomMenu from '../../components/UI/CustomMenu';
import Colors from '../../constants/Colors';
import Product from '../../models/Product.class';
import { addToCart } from '../../store/actions/cart.actions';
import { fetchProduts } from '../../store/actions/product.actions';
import RootState from '../../store/rootState.model';
import globalStyles from '../../utils/globalStyles';

type ProductsOverviewScreenProps = {};

type Props = {
  navigation: NavigationStackProp<ProductsOverviewScreenProps>;
};

const ProductsOverviewScreen: NavigationComponent<{}, {}> = ({ navigation }: Props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(true);
  const availableProducts = useSelector((state: RootState) => state.products.availableProducts);
  const dispatch: any = useDispatch();
  const onViewDetails = ({ id: productId, title: productTitle }: Product) => {
    navigation.navigate({ routeName: 'ProductDetails', params: { productId, productTitle } });
  };
  const onAddToCart = (product: Product) => {
    dispatch(addToCart(product));
  };

  const fetchProducts = async () => {
    setIsRefreshing(true);
    await dispatch(fetchProduts());
    setIsRefreshing(false);
  };

  useEffect(() => {
    fetchProducts()
      .then(() => {
        setIsLoading(false);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, [dispatch]);

  if (isLoading) {
    return (
      <View style={globalStyles.absuluteCenter}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && availableProducts.length === 0) {
    return (
      <View style={globalStyles.absuluteCenter}>
        <Text>No Products Found!</Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={fetchProducts}
      refreshing={isRefreshing}
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
