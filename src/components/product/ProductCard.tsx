import { useState } from 'react';
import { Link } from 'react-router-dom';
import type { Product, Category } from '../../types';
import { formatPrice } from '../../utils/formatPrice';
import { useCart } from '../../context/CartContext';
import CategoryIcon from './CategoryIcon';
import styles from './ProductCard.module.css';

const categoryColors: Record<Category, string> = {
  dogs: 'var(--pink)',
  cats: 'var(--lavender)',
  birds: 'var(--mint)',
  fish: 'var(--sky)',
};

const categoryLabels: Record<Category, string> = {
  dogs: 'Dogs',
  cats: 'Cats',
  birds: 'Birds',
  fish: 'Fish',
};

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);
  const color = categoryColors[product.category];

  const handleAdd = () => {
    addItem(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 800);
  };

  return (
    <div className={styles.card}>
      <Link to={`/product/${product.id}`} className={styles.linkArea}>
        <div className={styles.imageArea} style={{ background: color }}>
          <CategoryIcon category={product.category} size={48} />
        </div>
        <div className={styles.info}>
          <span
            className={styles.categoryBadge}
            style={{ background: color, color: 'var(--text)' }}
          >
            {categoryLabels[product.category]}
          </span>
          <h3 className={styles.name}>{product.name}</h3>
          <p className={styles.description}>{product.description}</p>
        </div>
      </Link>
      <div className={styles.info} style={{ paddingTop: 0 }}>
        <div className={styles.footer}>
          <div className={styles.priceGroup}>
            <span className={styles.price}>{formatPrice(product.price)}</span>
            {product.originalPrice && (
              <span className={styles.originalPrice}>
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          <button
            className={`${styles.addBtn} ${added ? styles.addBtnAdded : ''}`}
            onClick={handleAdd}
          >
            {added ? 'Added' : 'Add'}
          </button>
        </div>
      </div>
    </div>
  );
}
