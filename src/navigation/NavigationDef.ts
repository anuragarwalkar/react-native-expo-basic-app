import Colors from '../constants/Colors';
import { OPEN_SANS_BOLD } from '../constants/Fonts';
import { isAndroid } from '../utils/utilityFunctions';

export const defaultNavigationOptions = {
  headerStyle: {
    backgroundColor: isAndroid ? Colors.primary : '',
  },
  headerTitleStyle: {
    fontFamily: OPEN_SANS_BOLD,
  },
  headerTintColor: isAndroid ? 'white' : Colors.primary,
};

// const drawerNavigationDefaultOptions = {
//   contentOptions: {
//     activeTintColor: Colors.primary,
//   },
// };
