import { Dimensions } from 'react-native';

const getDeviceWidth = (): number => {
  return Dimensions.get('window').width;
};

const getDeviceHeight = (): number => {
  return Dimensions.get('window').height;
};

export const deviceWidth = getDeviceWidth();
export const deviceHeight = getDeviceHeight();

export const getDimensions = (updateLayout: (value: number) => void): (() => void) => {
  const pathchedListner = () => {
    updateLayout(getDeviceWidth());
  };

  Dimensions.addEventListener('change', pathchedListner);

  return () => {
    Dimensions.removeEventListener('change', pathchedListner);
  };
};
