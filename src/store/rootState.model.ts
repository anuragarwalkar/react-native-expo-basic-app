import CartState from '../models/store/cartState.model';
import OrdersState from '../models/store/ordersState.model';
import ProductState from '../models/store/productState.model';

export default interface RootState {
  products: ProductState;
  cart: CartState;
  orders: OrdersState;
}
