import CartState from '../models/cartState.model';
import ProductState from '../models/productState.model';

export default interface RootState {
  products: ProductState;
  cart: CartState;
}
