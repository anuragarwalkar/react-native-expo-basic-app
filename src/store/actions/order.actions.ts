import CartItem from '../../models/CartItem';

export const ADD_ORDER = 'ADD_ORDER';

export const addOrder = (orders: CartItem[], totalAmount: number) => {
  return {
    type: ADD_ORDER,
    payload: { orders, totalAmount },
  };
};
