import Product from './product.model';

export default interface ProductState {
  availableProducts: Product[];
  userProducts: Product[];
}
