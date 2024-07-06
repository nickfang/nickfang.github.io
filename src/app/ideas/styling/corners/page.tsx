import Link from 'next/link';
import styles from './page.module.css';

const Corners = () => {
  return (
    <>
      <div className={styles.top}>
        <h2>Different Corner Styling</h2>
      </div>
      <div className={styles.container}>
        <div className={styles.sub_container}>
          <div className={styles.rounded}>Rounded</div>
          <div className={styles.rounded2}>Rounded</div>
          <div className={styles.rounded3}>Rounded</div>
          <div className={styles.rounded4}>Rounded</div>
        </div>
        <div className={styles.sub_container}>
          <div className={styles.elliptical}>Elliptical</div>
          <div className={styles.elliptical2}>Elliptical</div>
          <div className={styles.elliptical3}>Elliptical</div>
        </div>
        <div className={styles.sub_container}>
          <div className={styles.notched}>Notched</div>
          <div className={styles.notched2}>Notched</div>
          <div className={styles.notched3}>Notched</div>
        </div>
        <div className={styles.sub_container}>
          <div className={styles.scooped}>Scooped</div>
          <div className={styles.scooped2}>Scooped</div>
        </div>
        <div className={styles.sub_container}>
          <div className={styles.inverted}>Inverted</div>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>
          Some of these like the notched, scooped and inverted are pretty fragile. If you change the
          size, the after and before styling will need to be adjusted.
        </p>
        <p>
          Inspired by{' '}
          <Link href="https://blog.logrocket.com/create-fancy-corners-css/">
            Create Fancy Corners with CSS
          </Link>
        </p>
      </div>
    </>
  );
};

export default Corners;
