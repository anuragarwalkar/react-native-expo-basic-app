import { PRODUCTS } from '../../data/dummy-data';
import Product from '../../models/Product.class';
import ProductState from '../../models/store/productState.model';
import { CREATE_PRODUCT, DELETE_PRODUCT, UPDATE_PRODUCT } from '../actions/product.actions';

const USER_PRODUCTS = PRODUCTS.filter((product) => product.ownerId === 'u1');

const initiaState: ProductState = {
  availableProducts: PRODUCTS,
  userProducts: USER_PRODUCTS,
};

interface ActionType {
  type: string;
  payload: {
    productId: string;
    product: Product;
  };
}

const removeProduct = (userProducts: Product[], productId: string) => {
  return userProducts.filter((product: Product) => product.id !== productId);
};

export default (state = initiaState, action: ActionType) => {
  switch (action.type) {
    case DELETE_PRODUCT: {
      const productId = action.payload.productId;
      const { userProducts, availableProducts } = state;
      return {
        ...state,
        userProducts: removeProduct(userProducts, productId),
        availableProducts: removeProduct(availableProducts, productId),
      };
    }
    case CREATE_PRODUCT: {
      const { product } = action.payload;
      const userProducts = [...state.userProducts, product];
      const availableProducts = [...state.availableProducts, product];
      return {
        ...state,
        userProducts,
        availableProducts,
      };
    }

    case UPDATE_PRODUCT: {
      const { product, productId } = action.payload;
      const mapProduct = (item: Product) => (item.id === productId ? product : item);
      const userProducts = state.userProducts.map(mapProduct);
      const availableProducts = state.availableProducts.map(mapProduct);
      return {
        ...state,
        userProducts,
        availableProducts,
      };
    }
  }
  return state;
};
