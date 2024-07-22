import styles from './page.module.css';

const CalcColor = () => {
  return (
    <div className={styles.base}>
      <p>
        Setting shades of backgrounds programatically using oklch for the background and
        color-contrast for the text.
      </p>
      <div className={styles.dark}>
        Box
        <div className={styles['bg-lighten']}>
          Lighter box
          <div className={styles['bg-lighten']}>
            Even lighter
            <div className={styles['bg-lighten']}>Even lighter</div>
          </div>
        </div>
        <div className={styles['bg-darken']}>
          Darker box
          <div className={styles['bg-darken']}>
            Even darker
            <div className={styles['bg-darken']}>Even darker</div>
          </div>
        </div>
      </div>

      <div className={styles.light}>
        Box
        <div className={styles['bg-lighten']}>
          Lighter box
          <div className={styles['bg-lighten']}>
            Even lighter
            <div className={styles['bg-lighten']}>Even lighter</div>
          </div>
        </div>
        <div className={styles['bg-darken']}>
          Darker box
          <div className={styles['bg-darken']}>
            Even darker
            <div className={styles['bg-darken']}>Even darker</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalcColor;
