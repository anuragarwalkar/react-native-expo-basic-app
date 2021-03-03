import moment from 'moment';
import CartItem from './CartItem';

export default class Order {
  constructor(public id: string, public items: CartItem[], public totalAmount: number, public date: Date) {}

  getDate() {
    return this.date.toString();
  }

  getReadableDate() {
    // return this.date.toLocaleDateString('en-EN', {
    //   year: 'numberc',
    //   month: 'long',
    //   day: 'numeric',
    //   hour: '2-digit',
    //   minute: '2-digit',
    // });
    return moment(this.date).format('MMMM Do YYYY, hh:mm');
  }
}
