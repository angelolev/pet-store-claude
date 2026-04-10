import type { CartItem as CartItemType, Category } from '../../types';
import { formatPrice } from '../../utils/formatPrice';
import { useCart } from '../../context/CartContext';
import CategoryIcon from '../product/CategoryIcon';
import styles from './CartItem.module.css';

const categoryColors: Record<Category, string> = {
  dogs: 'var(--pink)',
  cats: 'var(--lavender)',
  birds: 'var(--mint)',
  fish: 'var(--sky)',
};

export default function CartItemRow({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className={styles.item}>
      <div
        className={styles.icon}
        style={{ background: categoryColors[item.product.category] }}
      >
        <CategoryIcon category={item.product.category} size={28} />
      </div>
      <div className={styles.details}>
        <div className={styles.name}>{item.product.name}</div>
        <div className={styles.price}>
          {formatPrice(item.product.price * item.quantity)}
        </div>
      </div>
      <div className={styles.controls}>
        <button
          className={styles.qtyBtn}
          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
        >
          -
        </button>
        <span className={styles.qty}>{item.quantity}</span>
        <button
          className={styles.qtyBtn}
          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
        >
          +
        </button>
      </div>
      <button
        className={styles.removeBtn}
        onClick={() => removeItem(item.product.id)}
        aria-label="Remove"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      </button>
    </div>
  );
}
