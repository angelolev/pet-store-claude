import styles from './SupportPage.module.css';

export default function SupportPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <h1 className={styles.title}>Soporte al cliente</h1>
        <div className={styles.banner} role="alert">
          Llamar al{' '}
          <a href="tel:999999999" className={styles.phone}>
            999999999
          </a>{' '}
          para asistencia
        </div>
      </div>
    </div>
  );
}
