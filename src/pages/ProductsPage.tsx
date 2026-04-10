import { useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/products';
import type { Category } from '../types';
import CategoryFilter from '../components/product/CategoryFilter';
import ProductGrid from '../components/product/ProductGrid';
import styles from './ProductsPage.module.css';

export default function ProductsPage() {
  const { category } = useParams<{ category?: string }>();
  const navigate = useNavigate();

  const activeCategory = (category as Category) || null;

  const filtered = useMemo(
    () =>
      activeCategory
        ? products.filter((p) => p.category === activeCategory)
        : products,
    [activeCategory]
  );

  const handleFilter = (cat: Category | null) => {
    navigate(cat ? `/products/${cat}` : '/products');
  };

  return (
    <div className={styles.page}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>Products</h1>
          <p className={styles.count}>{filtered.length} products</p>
        </div>
        <CategoryFilter active={activeCategory} onChange={handleFilter} />
        {filtered.length > 0 ? (
          <ProductGrid products={filtered} />
        ) : (
          <p className={styles.empty}>No products found in this category.</p>
        )}
      </div>
    </div>
  );
}
