import HeaderComponent from "../components/Header";
import PlayerComponent from "../components/Player";
import styles from '../styles/app.module.scss';
import "../styles/global.scss";

function MyApp({ Component, pageProps }) {
  return (
    <div className={styles.wrapper}>
      <main>
        <HeaderComponent />
        <Component {...pageProps} />
      </main>
      <PlayerComponent />
    </div>
  );
}

export default MyApp
