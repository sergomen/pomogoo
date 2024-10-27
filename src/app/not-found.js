// not-found.js
import Link from 'next/link';
import styles from './not-found.module.css';

export default function NotFound() {
  return (
    <div className={styles.errorContainer}>
      <h1 className={styles.errorTitle}>404 - Page Not Found</h1>
      <p className={styles.errorMessage}>
        It seems we can't find what you're looking for. Perhaps searching can help.
      </p>
      <div className={styles.actions}>
        <Link href="/" className={styles.homeLink}>
          Go back home
        </Link>
      </div>
    </div>
  );
}