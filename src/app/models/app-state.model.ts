import {Product} from './product.model'

export interface AppState {
  readonly shopping: Array<Product>
}
