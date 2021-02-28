import Product from '../../models/product.model';

export const ADD_TO_CART = 'ADD_TO_CART';

export const addToCart = (product: Product) => {
  return {
    type: ADD_TO_CART,
    payload: {
      product,
    },
  };
};

export type CartActionType = 'ADD_TO_CART';
