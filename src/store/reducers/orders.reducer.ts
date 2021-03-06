import CartItem from '../../models/CartItem';
import Order from '../../models/Order.class';
import OrdersState from '../../models/store/ordersState.model';
import { ADD_ORDER, FETCH_ORDERS } from '../actions/order.actions';

const initialState: OrdersState = {
  orders: [],
};

interface Action {
  type: string;
  payload: {
    orders: CartItem[];
    totalAmount: number;
    id: string;
    date: string;
    allOrders: Order[];
  };
}

export default (state = initialState, action: Action): OrdersState => {
  switch (action.type) {
    case ADD_ORDER: {
      const uniqueId = action.payload.id;
      const date = action.payload.date;
      const { orders: payloadOrders, totalAmount } = action.payload;
      const newOrder = new Order(uniqueId, payloadOrders, totalAmount, date);

      const orders = [...state.orders, newOrder];

      return {
        ...state,
        orders,
      };
    }

    case FETCH_ORDERS: {
      const orders = action.payload.allOrders;
      return {
        ...state,
        orders,
      };
    }
  }
  return state;
};
