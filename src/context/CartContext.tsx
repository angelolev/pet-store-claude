import { createContext, useContext, useReducer, type ReactNode } from 'react';
import type { Product, CartItem } from '../types';

interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; product: Product }
  | { type: 'REMOVE_ITEM'; productId: number }
  | { type: 'UPDATE_QUANTITY'; productId: number; quantity: number }
  | { type: 'CLEAR_CART' };

interface CartContextType {
  state: CartState;
  addItem: (product: Product) => void;
  removeItem: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

function computeTotals(items: CartItem[]) {
  return {
    totalItems: items.reduce((sum, item) => sum + item.quantity, 0),
    totalPrice: items.reduce((sum, item) => sum + item.product.price * item.quantity, 0),
  };
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existing = state.items.find((i) => i.product.id === action.product.id);
      const items = existing
        ? state.items.map((i) =>
            i.product.id === action.product.id
              ? { ...i, quantity: i.quantity + 1 }
              : i
          )
        : [...state.items, { product: action.product, quantity: 1 }];
      return { items, ...computeTotals(items) };
    }
    case 'REMOVE_ITEM': {
      const items = state.items.filter((i) => i.product.id !== action.productId);
      return { items, ...computeTotals(items) };
    }
    case 'UPDATE_QUANTITY': {
      if (action.quantity <= 0) {
        const items = state.items.filter((i) => i.product.id !== action.productId);
        return { items, ...computeTotals(items) };
      }
      const items = state.items.map((i) =>
        i.product.id === action.productId ? { ...i, quantity: action.quantity } : i
      );
      return { items, ...computeTotals(items) };
    }
    case 'CLEAR_CART':
      return { items: [], totalItems: 0, totalPrice: 0 };
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    totalItems: 0,
    totalPrice: 0,
  });

  const addItem = (product: Product) => dispatch({ type: 'ADD_ITEM', product });
  const removeItem = (productId: number) => dispatch({ type: 'REMOVE_ITEM', productId });
  const updateQuantity = (productId: number, quantity: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', productId, quantity });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
}
