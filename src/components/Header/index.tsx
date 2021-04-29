import format from 'date-fns/format';
import styles from './styles.module.scss';

export default function HeaderComponent() {
  const currentDate = format(new Date(), 'EEEEEE, d MMMM');

  return (
    <header className={styles.container} >
      <img src="/logo.svg" alt="Podcastr" />
      <p>The best for you listen, always!</p>
      <span>{currentDate}</span>
    </header>
  );
}