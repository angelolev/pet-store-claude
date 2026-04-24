import { Link } from 'react-router-dom';
import { formatPrice } from '../../utils/formatPrice';
import styles from './ServiceList.module.css';

export type ServiceItem = {
  id: string;
  image: string;
  title: string;
  description: string;
  price: number;
  priceLabel?: string;
  href?: string;
};

type Props = {
  title: string;
  items: ServiceItem[];
};

export default function ServiceList({ title, items }: Props) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>{title}</h2>
      <ul className={styles.list}>
        {items.map((item) => {
          const Row = (
            <>
              <img className={styles.thumb} src={item.image} alt="" />
              <div className={styles.body}>
                <h3 className={styles.title}>{item.title}</h3>
                <p className={styles.description}>{item.description}</p>
              </div>
              <div className={styles.priceBlock}>
                {item.priceLabel && (
                  <span className={styles.priceLabel}>{item.priceLabel}</span>
                )}
                <span className={styles.price}>{formatPrice(item.price)}</span>
              </div>
              <svg
                className={styles.arrow}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M9 6l6 6-6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </>
          );

          return (
            <li key={item.id} className={styles.item}>
              {item.href ? (
                <Link to={item.href} className={styles.row}>
                  {Row}
                </Link>
              ) : (
                <div className={styles.row}>{Row}</div>
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
