import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Colors from '../constants/Colors';
import ProductsOverviewScreen from '../screens/shop/ProductsOverviewScreen';
import { isAndroid } from '../utils/utilityFunctions';

const ProductsNavigator = createStackNavigator(
  {
    ProductsOverviewScreen: {
      screen: ProductsOverviewScreen,
      navigationOptions: {
        headerTitle: 'All Products',
      },
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: isAndroid ? Colors.primary : '',
      },
      headerTintColor: isAndroid ? 'white' : Colors.primary,
    },
  }
);

export default createAppContainer(ProductsNavigator);
