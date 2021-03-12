export default class Product {
  constructor(
    public ownerId: string,
    public title: string,
    public imageUrl: string,
    public description: string,
    public price: number,
    public id?: string,
    public pushToken?: string
  ) {}
}
