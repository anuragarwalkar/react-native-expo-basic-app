import Product from '../../models/Product.class';

export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';

export const addToCart = (product: Product) => {
  return {
    type: ADD_TO_CART,
    payload: {
      product,
    },
  };
};

export const removeFromCart = (productId: string) => {
  return {
    type: REMOVE_FROM_CART,
    payload: { productId },
  };
};

export type CartActionType = 'ADD_ORDER' | 'ADD_TO_CART' | 'REMOVE_FROM_CART';
