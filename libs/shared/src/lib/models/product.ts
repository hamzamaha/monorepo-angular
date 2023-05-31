import { Category } from './category';

export interface Product {
  _id?: string;
  title?: string;
  description?: string;
  content?: string;
  brand?: string;
  countStock?: number;
  price?: number;
  thumbnail?: string;
  // images?: string[];
  rating?: number;
  isFeatured?: boolean;
  category?: Category;
}
export interface ResProduct {
  success?: boolean;
  products: Product[];
}
export interface ResOneProduct {
  success?: boolean;
  product: Product;
}
