import CartItem from '../../models/CartItem';
import CartState from '../../models/cartState.model';
import Product from '../../models/product.model';
import { ADD_TO_CART, CartActionType } from '../actions/cart.actions';

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

interface action {
  type: CartActionType;
  payload: {
    product: Product;
  };
}

export default (state = initialState, action: action): CartState => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { title, id, price } = action.payload.product;
      const oldItems = [...state.items];
      const oldItemIndex = oldItems.findIndex((item) => item.id === id);
      const quantity = oldItemIndex >= 0 ? oldItems[oldItemIndex].quantity + 1 : 1;
      oldItems.splice(oldItemIndex, 1);
      const sum = price * quantity;
      const items = [...oldItems, new CartItem(id, price, title, quantity, sum)];
      const totalAmount = items.reduce((prev, { sum: oldSum }) => prev + oldSum, 0);
      const newState = { ...state, items, totalAmount };
      console.log(newState);
      return newState;
    }

    default: {
      return state;
    }
  }
};
