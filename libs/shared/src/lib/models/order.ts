import { OrderItems } from './order-items';
import { User } from './user';

/* eslint-disable @typescript-eslint/no-empty-interface */
export interface Order {
  _id?: string;
  shippingAddress?: string;
  invoiceAddress?: string;
  city?: string;
  country?: string;
  phone?: string;
  status?: string;
  total?: number;
  user?: User;
  orderItems?: OrderItems[];
  created_at?: Date;

  editing?: boolean; // Add this line
}

export interface ResOrder {
  success?: boolean;
  orders: Order[];
}

export interface ResOneOrder {
  success?: boolean;
  order: Order;
}
