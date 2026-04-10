import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItemRow from '../components/cart/CartItem';
import CartSummary from '../components/cart/CartSummary';
import Button from '../components/ui/Button';
import styles from './CartPage.module.css';

export default function CartPage() {
  const { state } = useCart();

  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>Cart</h1>
        {state.items.length === 0 ? (
          <div className={styles.empty}>
            <div className={styles.emptyTitle}>Your cart is empty</div>
            <p className={styles.emptyText}>
              Add products to start your purchase
            </p>
            <Link to="/products">
              <Button>View products</Button>
            </Link>
          </div>
        ) : (
          <div className={styles.layout}>
            <div className={styles.items}>
              {state.items.map((item) => (
                <CartItemRow key={item.product.id} item={item} />
              ))}
            </div>
            <CartSummary />
          </div>
        )}
      </div>
    </div>
  );
}
