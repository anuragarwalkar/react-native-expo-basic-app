import { PRODUCTS } from '../../data/dummy-data';
import ProductState from '../../models/productState.model';

const userProducts = PRODUCTS.filter((product) => product.ownerId === 'u1');

const initiaState: ProductState = {
  availableProducts: PRODUCTS,
  userProducts,
};

interface ActionType {
  type: string;
  payload: {};
}

export default (state = initiaState, action: ActionType) => {
  return state;
};
