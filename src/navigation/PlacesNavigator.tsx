import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import appColors from '../constants/appColors';
import MapScreen from '../screens/MapScreen';
import NewPlace from '../screens/NewPlace';
import PlaceDetails from '../screens/PlaceDetails';
import PlaceList from '../screens/PlaceList';
import { isAndroid } from '../utils/utilityFunctions';

const PlaceNavigator = createStackNavigator(
  {
    Places: PlaceList,
    PlaceDetails: PlaceDetails,
    NewPlace: NewPlace,
    Maps: MapScreen,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: isAndroid ? appColors.primary : '',
      },
      headerTitleStyle: {
        color: isAndroid ? 'white' : appColors.primary,
      },
    },
  }
);

export default createAppContainer(PlaceNavigator);
