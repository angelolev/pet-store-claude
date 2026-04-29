import { Link, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import { categories } from '../data/categories';
import ProductGrid from '../components/product/ProductGrid';
import CategoryIcon from '../components/product/CategoryIcon';
import Button from '../components/ui/Button';
import styles from './HomePage.module.css';

export default function HomePage() {
  const navigate = useNavigate();
  const featured = products.filter((p) => p.originalPrice !== null).slice(0, 4);
  const latest = products.slice(0, 8);

  return (
    <>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>Everything for your best friend</h1>
          <p className={styles.heroSubtitle}>
            Find the best products for the care and well-being of your pets. Premium quality at the
            best prices.
          </p>
          <div className={styles.heroBtns}>
            <Button onClick={() => navigate('/products')}>Shop products</Button>
            <Button variant="outline" onClick={() => navigate('/products')}>
              View deals
            </Button>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Categories</h2>
            <p className={styles.sectionSubtitle}>Browse our catalog by pet type</p>
          </div>
          <div className={styles.categories}>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/products/${cat.id}`}
                className={styles.categoryCard}
                style={{ background: cat.color }}
              >
                <div className={styles.categoryIcon}>
                  <CategoryIcon category={cat.id} size={48} />
                </div>
                <div className={styles.categoryLabel}>{cat.label}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.section} style={{ background: 'var(--bg-accent)' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Deals</h2>
            <p className={styles.sectionSubtitle}>Products with special discounts</p>
          </div>
          <ProductGrid products={featured} />
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Featured products</h2>
            <p className={styles.sectionSubtitle}>The most popular items in our store</p>
          </div>
          <ProductGrid products={latest} />
          <div className={styles.viewAll}>
            <Button variant="outline" onClick={() => navigate('/products')}>
              View all products
            </Button>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className="container">
          <div className={styles.offerBanner}>
            <h2 className={styles.offerTitle}>Free shipping on orders over $500</h2>
            <p className={styles.offerText}>Enjoy free shipping on all orders over $500 MXN</p>
            <Button onClick={() => navigate('/products')}>Shop now</Button>
          </div>
        </div>
      </section>

      <section className={styles.section} style={{ background: 'var(--bg-accent)' }}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Why choose us</h2>
          </div>
          <div className={styles.features}>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="1" y="3" width="15" height="13" />
                  <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
              </div>
              <div className={styles.featureTitle}>Fast shipping</div>
              <div className={styles.featureText}>Delivery within 24-48 hours nationwide</div>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div className={styles.featureTitle}>Quality guaranteed</div>
              <div className={styles.featureText}>We only work with the best brands</div>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="1 4 1 10 7 10" />
                  <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                </svg>
              </div>
              <div className={styles.featureTitle}>Easy returns</div>
              <div className={styles.featureText}>30 days to return, no questions asked</div>
            </div>
            <div className={styles.featureCard}>
              <div className={styles.featureIcon}>
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </div>
              <div className={styles.featureTitle}>24/7 support</div>
              <div className={styles.featureText}>Personalized assistance whenever you need it</div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
