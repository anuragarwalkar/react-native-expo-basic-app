import { KeyboardTypeOptions } from 'react-native';

export interface FormDataItem {
  id: number;
  alise: string;
  value: string;
  title: string;
  keyboradType: KeyboardTypeOptions;
  isValid: boolean;
  touched: boolean;
}
export interface FormData {
  [key: string]: FormDataItem;
}
export const formData: FormData = {
  title: { id: 1, value: '', isValid: false, touched: false, keyboradType: 'default', alise: 'title', title: 'Title' },
  imageUrl: {
    id: 2,
    value: '',
    isValid: false,
    touched: false,
    keyboradType: 'default',
    alise: 'imageUrl',
    title: 'Image URL',
  },
  price: {
    id: 3,
    value: '',
    isValid: false,
    touched: false,
    keyboradType: 'decimal-pad',
    title: 'Price',
    alise: 'price',
  },
  description: {
    id: 4,
    value: '',
    isValid: false,
    touched: false,
    keyboradType: 'default',
    title: 'Description',
    alise: 'description',
  },
};
