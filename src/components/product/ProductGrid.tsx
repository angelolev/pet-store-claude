import type { Product } from '../../types';
import ProductCard from './ProductCard';
import styles from './ProductGrid.module.css';

export default function ProductGrid({ products }: { products: Product[] }) {
  return (
    <div className={styles.grid}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
