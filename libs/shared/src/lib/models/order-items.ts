import { Product } from './product';

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface OrderItems {
  product?: Product;
  quantity?: number;
  originalPrice?: number;
}
