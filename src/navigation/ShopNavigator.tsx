import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';
import Colors from '../constants/Colors';
import { OPEN_SANS_BOLD } from '../constants/Fonts';
import CartScreen from '../screens/shop/CartScreen';
import OrdersScreen from '../screens/shop/OrdersScreen';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import { isAndroid } from '../utils/utilityFunctions';

const defaultNavigationOptions = {
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: isAndroid ? Colors.primary : '',
    },
    headerTitleStyle: {
      fontFamily: OPEN_SANS_BOLD,
    },
    headerTintColor: isAndroid ? 'white' : Colors.primary,
  },
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
  defaultNavigationOptions
);

const OrdersNavigator = createStackNavigator(
  {
    Orders: OrdersScreen,
  },
  defaultNavigationOptions
);

const DrawerNavigator = createDrawerNavigator(
  {
    Products: ProductsNavigator,
    orders: OrdersNavigator,
  },
  {
    contentOptions: {
      activeTintColor: Colors.primary,
    },
  }
);

export default createAppContainer(DrawerNavigator);
