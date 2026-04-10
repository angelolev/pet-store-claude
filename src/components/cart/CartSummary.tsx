import { useCart } from '../../context/CartContext';
import { formatPrice } from '../../utils/formatPrice';
import Button from '../ui/Button';
import styles from './CartSummary.module.css';

export default function CartSummary() {
  const { state, clearCart } = useCart();

  const handleCheckout = () => {
    clearCart();
  };

  return (
    <div className={styles.summary}>
      <h3 className={styles.title}>Order summary</h3>
      <div className={styles.row}>
        <span className={styles.rowLabel}>Items ({state.totalItems})</span>
        <span>{formatPrice(state.totalPrice)}</span>
      </div>
      <div className={styles.row}>
        <span className={styles.rowLabel}>Shipping</span>
        <span>Free</span>
      </div>
      <hr className={styles.divider} />
      <div className={styles.total}>
        <span>Total</span>
        <span>{formatPrice(state.totalPrice)}</span>
      </div>
      <Button full onClick={handleCheckout}>
        Checkout
      </Button>
    </div>
  );
}
