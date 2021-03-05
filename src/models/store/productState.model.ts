import Product from '../Product.class';

export default interface ProductState {
  availableProducts: Product[];
  userProducts: Product[];
}
