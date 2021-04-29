import styles from './styles.module.scss';

export default function PlayerComponent() {
  return (
    <div className={styles.container}>
      <header>
        <img src="/playing.svg" alt="Playing now" />
        <strong>Playing now</strong>
      </header>

      <div className={styles.emptyContainerPlayer}>
        <strong>Select a podcats for listing</strong>
      </div>

      <footer className={styles.empty}>
        <div className={styles.progressContainer}>
          <span>00:00</span>
          <div className={styles.sliderContainer}>
            <div className={styles.emptySlider} />
          </div>
          <span>00:00</span>
        </div>

        <div className={styles.buttonsContainer}>
          <button type="button">
            <img src="/shuffle.svg" alt="Shuffle" />
          </button>
          <button type="button">
            <img src="/play-previous.svg" alt="Play previous" />
          </button>
          <button type="button" className={styles.playButton}>
            <img src="/play.svg" alt="PLay" />
          </button>
          <button type="button">
            <img src="/play-next.svg" alt="Play next" />
          </button>
          <button type="button">
            <img src="/repeat.svg" alt="Repeat" />
          </button>
        </div>
      </footer>
    </div>
  );
}