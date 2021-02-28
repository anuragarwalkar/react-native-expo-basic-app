import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Colors from '../constants/Colors';
import { OPEN_SANS_BOLD } from '../constants/Fonts';
import ProductDetailsScreen from '../screens/shop/ProductDetailsScreen';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import { isAndroid } from '../utils/utilityFunctions';

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
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: isAndroid ? Colors.primary : '',
      },
      headerTitleStyle: {
        fontFamily: OPEN_SANS_BOLD,
      },
      headerTintColor: isAndroid ? 'white' : Colors.primary,
    },
  }
);

export default createAppContainer(ProductsNavigator);
