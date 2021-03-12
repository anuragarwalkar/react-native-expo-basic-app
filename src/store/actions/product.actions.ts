import { getExpoPushTokenAsync } from 'expo-notifications';
import { NOTIFICATIONS } from 'expo-permissions';
import { Dispatch } from 'react';
import Product from '../../models/Product.class';
import { baseUrl, getPermissions } from '../../utils/utilityFunctions';
import RootState from '../rootState.model';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProduts = () => {
  return async (dispatch: Dispatch<{}>, getState: () => RootState) => {
    let fbRes: any = null;
    const { token, userId } = getState().auth;
    try {
      const response = await fetch(baseUrl('/products.json', token));
      fbRes = await response.json();
      if (!response.ok) {
        throw new Error(fbRes.error);
      }
    } catch (error) {
      throw new Error(error.message);
    }

    const products: Product[] = [];
    if (fbRes) {
      for (const [key, value] of Object.entries(fbRes) as any) {
        products.push(
          new Product(userId, value.title, value.imageUrl, value.description, value.price, key, value.pushToken)
        );
      }
    }

    dispatch({ type: SET_PRODUCTS, payload: { products, userId } });
  };
};

export const deleteProduct = (productId: string) => {
  return async (dispatch: Dispatch<{}>, getState: () => RootState) => {
    const token = getState().auth.token;
    await fetch(baseUrl(`/products/${productId}.json`, token), {
      method: 'DELETE',
    });

    return dispatch({
      type: DELETE_PRODUCT,
      payload: { productId },
    });
  };
};

export const createProduct = (product: Product) => {
  return async (dispatch: Dispatch<{}>, getState: () => RootState) => {
    const expo = { pushToken: '' };
    const res = await getPermissions(NOTIFICATIONS);
    if (res) {
      const { data } = await getExpoPushTokenAsync();
      console.log('data:', data);
      expo.pushToken = data;
    }
    const token = getState().auth.token;
    const { pushToken } = expo;
    const response = await fetch(baseUrl('/products.json', token), {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ ...product, pushToken }),
    });

    const fbRes = await response.json();

    product.id = fbRes.name;

    dispatch({
      type: CREATE_PRODUCT,
      payload: {
        product,
      },
    });
  };
};

export const updateProduct = (productId: string, product: Product) => {
  return async (dispatch: Dispatch<{}>, getState: () => RootState) => {
    const token = getState().auth.token;
    await fetch(baseUrl(`/products/${productId}.json`, token), {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(product),
    });

    product.id = productId;

    dispatch({
      type: UPDATE_PRODUCT,
      payload: {
        productId,
        product,
      },
    });
  };
};
