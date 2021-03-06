import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { LogBox } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import Colors from '../constants/Colors';
import { OPEN_SANS_BOLD } from '../constants/Fonts';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import AuthScreen from '../screens/user/AuthScreen';
import EditProduct from '../screens/user/EditProduct';
import UserProducts from '../screens/user/UserProducts';
import { isAndroid } from '../utils/utilityFunctions';

const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: isAndroid ? Colors.primary : '',
  },
  headerTitleStyle: {
    fontFamily: OPEN_SANS_BOLD,
  },
  headerTintColor: isAndroid ? 'white' : Colors.primary,
};

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverview: {
      screen: ProductsOverviewScreen,
      navigationOptions: {
        headerTitle: 'All Products',
      },
    },
    ProductDetails: {
      screen: ProductDetailsScreen,
    },
    Cart: {
      screen: CartScreen,
    },
  },
  {
    defaultNavigationOptions,
  }
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: {
      screen: OrdersScreen,
    },
  },
  {
    defaultNavigationOptions,
  }
);

const AdminNavigator = createStackNavigator(
  {
    Admin: {
      screen: UserProducts,
    },
    EditProduct: {
      screen: EditProduct,
    },
  },
  {
    defaultNavigationOptions,
  }
);

const ShopNavigator = createDrawerNavigator(
  {
    Products: {
      screen: ProductsNavigator,
      navigationOptions: {
        drawerLabel: 'Products',
        drawerIcon: (drawerConfig) => {
          return <Ionicons name={isAndroid ? 'md-cart' : 'ios-cart'} size={23} color={drawerConfig.tintColor} />;
        },
      },
    },
    Orders: {
      screen: OrdersNavigator,
      navigationOptions: {
        drawerLabel: 'Orders',
        drawerIcon: (drawerConfig) => {
          return <Ionicons name={isAndroid ? 'md-list' : 'ios-list'} size={23} color={drawerConfig.tintColor} />;
        },
      },
    },
    Admin: {
      screen: AdminNavigator,
      navigationOptions: {
        drawerLabel: 'Admin*',
        drawerIcon: (drawerConfig) => {
          return <Ionicons name={isAndroid ? 'md-create' : 'ios-create'} size={23} color={drawerConfig.tintColor} />;
        },
      },
    },
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
  }
);

const AuthNavigator = createStackNavigator({
  Auth: {
    screen: AuthScreen,
  },
});

const MainNavigator = createSwitchNavigator({
  Auth: AuthNavigator,
  Shop: ShopNavigator,
});

LogBox.ignoreLogs(['Your project is accessing the following APIs']);

export default createAppContainer(MainNavigator);
