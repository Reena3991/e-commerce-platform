import { Product } from './product.model';

export interface Order {
  id: number;
  userId: number;
  products: Product[];
  totalAmount: number;
  status: string;
  orderDate: string;
}
