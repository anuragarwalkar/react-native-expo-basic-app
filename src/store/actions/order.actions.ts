import { Dispatch } from 'react';
import CartItem from '../../models/CartItem';
import Order from '../../models/Order.class';
import { baseUrl } from '../../utils/utilityFunctions';

export const ADD_ORDER = 'ADD_ORDER';
export const FETCH_ORDERS = 'FETCH_ORDERS';

export const fetchOrders = () => {
  return async (dispatch: Dispatch<any>) => {
    const response = await fetch(baseUrl('/orders/u1.json'));

    const fbRes = await response.json();
    const allOrders: Order[] = [];
    if (fbRes) {
      for (const [key, value] of Object.entries(fbRes) as any) {
        allOrders.push(new Order(key, value.orders, value.totalAmount, value.date));
      }
    }

    dispatch({ type: FETCH_ORDERS, payload: { allOrders } });
  };
};

export const addOrder = (orders: CartItem[], totalAmount: number) => {
  return async (dispatch: Dispatch<{}>) => {
    const date = new Date().toISOString();
    const response = await fetch(baseUrl('/orders/u1.json'), {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        orders,
        date,
        totalAmount,
      }),
    });

    const fbRes = await response.json();

    dispatch({
      type: ADD_ORDER,
      payload: { id: fbRes.name, orders, totalAmount, date },
    });
  };
};
