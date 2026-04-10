export type Category = 'dogs' | 'cats' | 'birds' | 'fish';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice: number | null;
  category: Category;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CategoryInfo {
  id: Category;
  label: string;
  color: string;
}
