import CartItem from '../../models/CartItem';
import Order from '../../models/Order.class';
import OrdersState from '../../models/store/ordersState.model';
import { ADD_ORDER } from '../actions/order.actions';

const initialState: OrdersState = {
  orders: [],
};

interface Action {
  type: string;
  payload: {
    orders: CartItem[];
    totalAmount: number;
  };
}

export default (state = initialState, action: Action): OrdersState => {
  switch (action.type) {
    case ADD_ORDER: {
      const tempUniqueId = new Date().toString();
      const { orders: payloadOrders, totalAmount } = action.payload;
      const newOrder = new Order(tempUniqueId, payloadOrders, totalAmount, new Date());

      const orders = [...state.orders, newOrder];

      return {
        ...state,
        orders,
      };
    }
  }
  return state;
};
