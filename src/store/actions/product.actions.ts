import Product from '../../models/Product.class';

export const DELETE_PRODUCT = 'DELETE_PRODUCT';
export const CREATE_PRODUCT = 'CREATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';

export const deleteProduct = (productId: string) => {
  return {
    type: DELETE_PRODUCT,
    payload: { productId },
  };
};

export const createProduct = (product: Product) => {
  return {
    type: CREATE_PRODUCT,
    payload: {
      product,
    },
  };
};

export const updateProduct = (productId: string, product: Product) => {
  return {
    type: UPDATE_PRODUCT,
    payload: {
      productId,
      product,
    },
  };
};
