import { Dispatch } from 'react';
import Product from '../../models/Product.class';
import { baseUrl } from '../../utils/utilityFunctions';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProduts = () => {
  return async (dispatch: Dispatch<{}>) => {
    const response = await fetch(baseUrl('/products.json'));

    const fbRes = await response.json();
    const products: Product[] = [];
    if (fbRes) {
      for (const [key, value] of Object.entries(fbRes) as any) {
        products.push(new Product('u1', value.title, value.imageUrl, value.description, value.price, key));
      }
    }
    dispatch({ type: SET_PRODUCTS, payload: { products } });
  };
};

export const deleteProduct = (productId: string) => {
  return async (dispatch: Dispatch<{}>) => {
    await fetch(baseUrl(`/products/${productId}.json`), {
      method: 'DELETE',
    });

    return dispatch({
      type: DELETE_PRODUCT,
      payload: { productId },
    });
  };
};

export const createProduct = (product: Product) => {
  return async (dispatch: Dispatch<{}>) => {
    const response = await fetch(baseUrl('/products.json'), {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(product),
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
  return async (dispatch: Dispatch<{}>) => {
    await fetch(baseUrl(`/products/${productId}.json`), {
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
