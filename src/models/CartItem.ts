export default class CartItem {
  constructor(
    public id: string,
    public productPrice: number,
    public productTitle: string,
    public quantity: number,
    public sum: number
  ) {}
}
