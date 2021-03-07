import { Dispatch } from 'react';
import CartItem from '../../models/CartItem';
import Order from '../../models/Order.class';
import { baseUrl } from '../../utils/utilityFunctions';
import RootState from '../rootState.model';

export const ADD_ORDER = 'ADD_ORDER';
export const FETCH_ORDERS = 'FETCH_ORDERS';

export const fetchOrders = () => {
  return async (dispatch: Dispatch<any>, getState: () => RootState) => {
    let fbRes: any = null;
    try {
      const { token, userId } = getState().auth;
      const response = await fetch(baseUrl(`/orders/${userId}.json`, token));
      fbRes = await response.json();
      if (!response.ok) {
        throw new Error(fbRes.error);
      }
    } catch (error) {
      throw new Error(error.message);
    }

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
  return async (dispatch: Dispatch<{}>, getState: () => RootState) => {
    const date = new Date().toISOString();
    const { token, userId } = getState().auth;
    let fbRes: any = null;
    try {
      const response = await fetch(baseUrl(`/orders/${userId}.json`, token), {
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
      fbRes = await response.json();
      if (!response.ok) {
        throw new Error(fbRes.error);
      }
    } catch (error) {
      throw new Error(error.message);
    }

    dispatch({
      type: ADD_ORDER,
      payload: { id: fbRes.name, orders, totalAmount, date },
    });
  };
};
