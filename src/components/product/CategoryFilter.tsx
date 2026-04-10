import type { Category } from '../../types';
import { categories } from '../../data/categories';
import styles from './CategoryFilter.module.css';

interface Props {
  active: Category | null;
  onChange: (category: Category | null) => void;
}

export default function CategoryFilter({ active, onChange }: Props) {
  return (
    <div className={styles.filters}>
      <button
        className={`${styles.filterBtn} ${active === null ? styles.filterBtnActive : ''}`}
        onClick={() => onChange(null)}
      >
        All
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          className={`${styles.filterBtn} ${active === cat.id ? styles.filterBtnActive : ''}`}
          onClick={() => onChange(cat.id)}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
