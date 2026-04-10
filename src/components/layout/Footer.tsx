import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div>
          <div className={styles.brand}>PetShop</div>
          <div className={styles.subtitle}>Everything for your best friend</div>
        </div>
        <div className={styles.links}>
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart</Link>
        </div>
      </div>
    </footer>
  );
}
