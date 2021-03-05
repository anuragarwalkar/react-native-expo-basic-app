import React from 'react';
import { Alert, Button, FlatList } from 'react-native';
import { NavigationComponent } from 'react-navigation';
import { NavigationStackScreenProps } from 'react-navigation-stack';
import { useDispatch, useSelector } from 'react-redux';
import ProductItem from '../../components/shop/ProductItem';
import CustomMenu from '../../components/UI/CustomMenu';
import Colors from '../../constants/Colors';
import { deleteProduct } from '../../store/actions/product.actions';
import RootState from '../../store/rootState.model';

const UserProducts: NavigationComponent<{}, {}> = (props: NavigationStackScreenProps) => {
  const userProducts = useSelector((state: RootState) => state.products.userProducts);
  const dispatch = useDispatch();
  const onEditPress = (productId: string) => {
    props.navigation.navigate({ routeName: 'EditProduct', params: { productId } });
  };

  const deleteProductHandler = (id: string) => {
    Alert.alert('Are you sure?', 'Do you really want to delete this item?', [
      { text: 'No', style: 'default' },
      {
        text: 'Yes',
        style: 'destructive',
        onPress: () => {
          dispatch(deleteProduct(id));
        },
      },
    ]);
  };
  return (
    <FlatList
      data={userProducts}
      renderItem={(userProduct) => (
        <ProductItem product={userProduct.item} viewDetails={() => onEditPress(userProduct.item.id)}>
          <Button color={Colors.primary} title="Edit*" onPress={() => onEditPress(userProduct.item.id)} />
          <Button color={Colors.primary} title="Delete" onPress={() => deleteProductHandler(userProduct.item.id)} />
        </ProductItem>
      )}
    />
  );
};

UserProducts.navigationOptions = (props: any) => {
  const toggleDrawer = props.navigation.toggleDrawer;

  return {
    headerTitle: 'Your Products',
    headerLeft: () => <CustomMenu title="Menu" icon="menu" onPress={toggleDrawer} />,
    headerRight: () => (
      <CustomMenu
        title="Create"
        icon="create"
        onPress={() => {
          props.navigation.navigate({ routeName: 'EditProduct' });
        }}
      />
    ),
  };
};

export default UserProducts;
