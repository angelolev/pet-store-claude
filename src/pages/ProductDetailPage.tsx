import { useState, useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import type { Category } from '../types';
import { formatPrice } from '../utils/formatPrice';
import { useCart } from '../context/CartContext';
import CategoryIcon from '../components/product/CategoryIcon';
import ProductGrid from '../components/product/ProductGrid';
import Button from '../components/ui/Button';
import styles from './ProductDetailPage.module.css';

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

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const product = products.find((p) => p.id === Number(id));

  const related = useMemo(() => {
    if (!product) return [];
    return products
      .filter((p) => p.category === product.category && p.id !== product.id)
      .slice(0, 4);
  }, [product]);

  if (!product) {
    return (
      <div className={styles.page}>
        <div className="container">
          <div className={styles.notFound}>
            <div className={styles.notFoundTitle}>Product not found</div>
            <p className={styles.notFoundText}>
              The product you are looking for does not exist or was removed.
            </p>
            <Button onClick={() => navigate('/products')}>View products</Button>
          </div>
        </div>
      </div>
    );
  }

  const color = categoryColors[product.category];
  const discount = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : null;

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) {
      addItem(product);
    }
    setAdded(true);
    setTimeout(() => setAdded(false), 1200);
  };

  return (
    <>
      <div className={styles.page}>
        <div className="container">
          <Link to="/products" className={styles.back}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back to products
          </Link>

          <div className={styles.layout}>
            <div className={styles.imageArea} style={{ background: color }}>
              <CategoryIcon category={product.category} size={96} />
            </div>

            <div className={styles.details}>
              <span
                className={styles.categoryBadge}
                style={{ background: color, color: 'var(--text)' }}
              >
                {categoryLabels[product.category]}
              </span>

              <h1 className={styles.name}>{product.name}</h1>
              <p className={styles.description}>{product.description}</p>

              <div className={styles.priceGroup}>
                <span className={styles.price}>{formatPrice(product.price)}</span>
                {product.originalPrice && (
                  <span className={styles.originalPrice}>
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
                {discount && (
                  <span className={styles.discount}>-{discount}%</span>
                )}
              </div>

              <hr className={styles.divider} />

              <div className={styles.actions}>
                <div className={styles.qtyControl}>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                  >
                    -
                  </button>
                  <span className={styles.qtyValue}>{qty}</span>
                  <button
                    className={styles.qtyBtn}
                    onClick={() => setQty((q) => q + 1)}
                  >
                    +
                  </button>
                </div>
                <Button full onClick={handleAdd}>
                  {added ? 'Added to cart' : `Add to cart - ${formatPrice(product.price * qty)}`}
                </Button>
              </div>

              <hr className={styles.divider} />

              <div className={styles.features}>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
                    </svg>
                  </span>
                  Free shipping over $500
                </div>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </span>
                  Quality guaranteed
                </div>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="1 4 1 10 7 10" /><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                    </svg>
                  </span>
                  30-day returns
                </div>
                <div className={styles.feature}>
                  <span className={styles.featureIcon}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                    </svg>
                  </span>
                  24/7 support
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className={styles.related}>
          <div className="container">
            <h2 className={styles.relatedTitle}>Related products</h2>
            <ProductGrid products={related} />
          </div>
        </section>
      )}
    </>
  );
}
