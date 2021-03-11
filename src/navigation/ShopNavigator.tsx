import { Ionicons } from '@expo/vector-icons';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import Colors from '../constants/Colors';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen, { ordersNavigationOptions } from '../screens/shop/OrdersScreen';
import ProductDetailsScreen, { productDetailsNavigationOptions } from '../screens/shop/ProductDetailsScreen';
import ProductsOverviewScreen, { productsNavigationOptions } from '../screens/shop/ProductsOverviewScreen';
import EditProduct, { editProductNavigationOptions } from '../screens/user/EditProduct';
import UserProducts from '../screens/user/UserProducts';
import { isAndroid } from '../utils/utilityFunctions';
import { defaultNavigationOptions } from './NavigationDef';

const ProductsStackNavigator = createStackNavigator();
const OrdersStackNavigator = createStackNavigator();
const AdminStackNavigator = createStackNavigator();
const DefaultDrawerNavigator = createDrawerNavigator();

export const ProductsNavigator = () => {
  return (
    <ProductsStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <ProductsStackNavigator.Screen
        name="ProductOverview"
        options={productsNavigationOptions}
        component={ProductsOverviewScreen}
      />
      <ProductsStackNavigator.Screen
        name="ProductDetails"
        options={productDetailsNavigationOptions}
        component={ProductDetailsScreen}
      />
      <ProductsStackNavigator.Screen name="Cart" component={CartScreen} />
    </ProductsStackNavigator.Navigator>
  );
};

const OrdersNavigator = () => {
  return (
    <OrdersStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <OrdersStackNavigator.Screen name="Orders" options={ordersNavigationOptions} component={OrdersScreen} />
    </OrdersStackNavigator.Navigator>
  );
};

const AdminNavigator = () => {
  return (
    <AdminStackNavigator.Navigator screenOptions={defaultNavigationOptions}>
      <AdminStackNavigator.Screen name="Products" options={productDetailsNavigationOptions} component={UserProducts} />
      <AdminStackNavigator.Screen name="EditProduct" options={editProductNavigationOptions} component={EditProduct} />
    </AdminStackNavigator.Navigator>
  );
};

const ProductsNavigationDrawer = {
  drawerLabel: 'Products',
  drawerIcon: (drawerConfig: any) => {
    return <Ionicons name={isAndroid ? 'md-cart' : 'ios-cart'} size={23} color={drawerConfig.tintColor} />;
  },
};

const OrdersNavigatorDrawerOptions = {
  drawerLabel: 'Orders',
  drawerIcon: (drawerConfig: any) => {
    return <Ionicons name={isAndroid ? 'md-list' : 'ios-list'} size={23} color={drawerConfig.tintColor} />;
  },
};

const AdminNavigatiorDrawerOptions = {
  drawerLabel: 'Admin*',
  drawerIcon: (drawerConfig: any) => {
    return <Ionicons name={isAndroid ? 'md-create' : 'ios-create'} size={23} color={drawerConfig.tintColor} />;
  },
};

const defaultDrawerNavigatorOptions = {
  activeTintColor: Colors.primary,
};

const DrawerNavigator = () => {
  return (
    <DefaultDrawerNavigator.Navigator drawerContentOptions={defaultDrawerNavigatorOptions}>
      <DefaultDrawerNavigator.Screen name="Products" options={ProductsNavigationDrawer} component={ProductsNavigator} />
      <DefaultDrawerNavigator.Screen name="Orders" options={OrdersNavigatorDrawerOptions} component={OrdersNavigator} />
      <DefaultDrawerNavigator.Screen name="Admin" options={AdminNavigatiorDrawerOptions} component={AdminNavigator} />
    </DefaultDrawerNavigator.Navigator>
  );
};

export default DrawerNavigator;
