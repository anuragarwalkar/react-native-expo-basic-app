import CartItem from './CartItem';

export default class Order {
  constructor(public id: string, public items: CartItem[], public totalAmount: number, public date: Date) {}
}
