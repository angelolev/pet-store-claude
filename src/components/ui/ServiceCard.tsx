import styles from './ServiceCard.module.css';

interface ServiceCardProps {
  image: string;
  imageAlt?: string;
  title: string;
  subtitle?: string;
  price: string;
  duration?: string;
  description?: string;
  ctaLabel?: string;
  onSchedule?: () => void;
  footnote?: string;
  className?: string;
}

export default function ServiceCard({
  image,
  imageAlt = '',
  title,
  subtitle,
  price,
  duration,
  description,
  ctaLabel = 'Agendar servicio',
  onSchedule,
  footnote,
  className = '',
}: ServiceCardProps) {
  const rootClasses = [styles.card, className].filter(Boolean).join(' ');

  return (
    <article className={rootClasses}>
      <div className={styles.media}>
        <img src={image} alt={imageAlt} className={styles.image} />
      </div>

      <div className={styles.body}>
        <header className={styles.header}>
          <div className={styles.titleBlock}>
            <h3 className={styles.title}>{title}</h3>
            {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
          </div>
          <p className={styles.price}>{price}</p>
        </header>

        {(duration || description) && (
          <div className={styles.meta}>
            {duration && (
              <div className={styles.metaRow}>
                <svg
                  className={styles.icon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 7v5l3 2" strokeLinecap="round" />
                </svg>
                <span className={styles.metaText}>{duration}</span>
              </div>
            )}

            {description && (
              <div className={styles.metaRow}>
                <svg
                  className={styles.icon}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <circle cx="12" cy="12" r="9" />
                  <path d="M12 11v5" strokeLinecap="round" />
                  <circle cx="12" cy="8" r="0.75" fill="currentColor" />
                </svg>
                <p className={styles.metaText}>{description}</p>
              </div>
            )}
          </div>
        )}

        <div className={styles.footer}>
          <button type="button" className={styles.cta} onClick={onSchedule}>
            {ctaLabel}
          </button>
          {footnote && <p className={styles.footnote}>{footnote}</p>}
        </div>
      </div>
    </article>
  );
}
