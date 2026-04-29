import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import styles from './Header.module.css';

export default function Header() {
  const { state } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.logo}>
          PetShop
        </Link>

        <button
          className={`${styles.menuToggle} ${menuOpen ? styles.menuToggleOpen : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Menu"
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}>
          <NavLink
            to="/"
            end
            className={({ isActive }) => (isActive ? styles.navLinkActive : styles.navLink)}
            onClick={() => setMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/products"
            className={({ isActive }) => (isActive ? styles.navLinkActive : styles.navLink)}
            onClick={() => setMenuOpen(false)}
          >
            Products
          </NavLink>
          <NavLink
            to="/cart"
            className={({ isActive }) => (isActive ? styles.navLinkActive : styles.navLink)}
            onClick={() => setMenuOpen(false)}
          >
            Cart
          </NavLink>
          <NavLink
            to="/support"
            className={({ isActive }) => (isActive ? styles.navLinkActive : styles.navLink)}
            onClick={() => setMenuOpen(false)}
          >
            Soporte
          </NavLink>
        </nav>

        <Link to="/cart" className={styles.cartBtn}>
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          {state.totalItems > 0 && <span className={styles.badge}>{state.totalItems}</span>}
        </Link>
      </div>
    </header>
  );
}
