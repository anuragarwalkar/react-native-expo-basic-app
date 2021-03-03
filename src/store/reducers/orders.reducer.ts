import Order from '../../models/Order.class';
import OrdersState from '../../models/store/ordersState.model';
import { ADD_ORDER } from '../actions/order.actions';

const initialState: OrdersState = {
  orders: [],
};

interface Action {
  type: string;
  payload: {
    items: [];
    amount: number;
  };
}

export default (state = initialState, action: Action): OrdersState => {
  switch (action.type) {
    case ADD_ORDER: {
      const tempUniqueId = new Date().toString();
      const newOrder = new Order(tempUniqueId, action.payload.items, action.payload.amount, new Date());
      const orders = [newOrder, ...state.orders];

      return {
        ...state,
        orders,
      };
    }
  }
  return state;
};
