import CartItem from '../../models/CartItem';
import Product from '../../models/Product.class';
import CartState from '../../models/store/cartState.model';
import { ADD_TO_CART, CartActionType, REMOVE_FROM_CART } from '../actions/cart.actions';
import { ADD_ORDER } from '../actions/order.actions';
import { DELETE_PRODUCT } from '../actions/product.actions';

const initialState: CartState = {
  items: [],
  totalAmount: 0,
};

interface action {
  type: CartActionType;
  payload: {
    product: Product;
    productId: string;
  };
}

const defaultSorting = (a: CartItem, b: CartItem) => (a.id > b.id ? 1 : -1);

export default (state = initialState, action: action): CartState => {
  switch (action.type) {
    case ADD_TO_CART: {
      const { title, id, price } = action.payload.product;
      const oldItems = [...state.items];
      const oldItemIndex = oldItems.findIndex((item) => item.id === id);
      const quantity = oldItemIndex >= 0 ? oldItems[oldItemIndex].quantity + 1 : 1;
      if (oldItemIndex != -1) {
        oldItems.splice(oldItemIndex, 1);
      }
      const sum = price * quantity;
      const items = [...oldItems, new CartItem(id, price, title, quantity, sum)];
      const totalAmount = items.reduce((prev, { sum: oldSum }) => prev + oldSum, 0);
      const newState = { ...state, items, totalAmount };
      items.sort(defaultSorting);
      return newState;
    }

    case REMOVE_FROM_CART: {
      const { productId } = action.payload;
      let totalAmount = 0;
      const clonedItems = [...state.items];
      const items: CartItem[] = [];

      for (const item of clonedItems) {
        const toBeRemoved = item.id === productId;
        const isHavingMultipleItems = item.quantity > 1;

        if (toBeRemoved && isHavingMultipleItems) {
          const totalQuantity = item.quantity;
          item.sum = item.sum / totalQuantity;
          item.quantity--;
        }

        if (toBeRemoved && !isHavingMultipleItems) {
          continue;
        }

        totalAmount = item.sum;

        items.push(item);
      }

      items.sort(defaultSorting);

      return {
        ...state,
        items,
        totalAmount,
      };
    }

    case ADD_ORDER: {
      return {
        ...initialState,
      };
    }

    case DELETE_PRODUCT: {
      const productId: string = action.payload.productId;
      const items = [];
      let totalAmount = 0;

      for (const item of state.items) {
        if (item.id === productId) {
          continue;
        }

        items.push(item);
        totalAmount += item.sum;
      }

      return {
        ...state,
        items,
        totalAmount,
      };
    }

    default: {
      return state;
    }
  }
};
