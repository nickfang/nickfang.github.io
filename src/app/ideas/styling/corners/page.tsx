import styles from './page.module.css';

const Corners = () => {
  return (
    <>
      <h2>Corners</h2>
      <div className={styles.container}>
        <div className={styles.rounded}>Rounded</div>

        <div className={styles.rounded2}>Rounded2</div>

        <div className={styles.rounded3}>Rounded3</div>

        <div className={styles.rounded4}>Rounded4</div>

        <div className={styles.elliptical}>Elliptical</div>

        <div className={styles.elliptical2}>Elliptical</div>

        <div className={styles.elliptical3}>Elliptical</div>

        <div className={styles.item}></div>

        <div className={styles.notched}>Notched</div>

        <div className={styles.notched2}>Notched</div>

        <div className={styles.notched3}>Notched</div>

        <div className={styles.scooped}>Scooped</div>
        <div className={styles.scooped2}>Scooped</div>

        <div className={styles.inverted}>Inverted</div>
      </div>
    </>
  );
};

export default Corners;
