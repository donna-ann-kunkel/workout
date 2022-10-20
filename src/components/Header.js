import styles from "./Header.module.css";

const Header = (props) => {
  return (
    <header className={styles.header}>
      <h1>Builder Buddy</h1>
      <button className={styles.button} onClick={props.onShowHistory}>
        View Workout History
      </button>
      <button className={styles.button} onClick={props.onShowForm}>
        Enter New Exercises
      </button>
      <button className={styles.button} onClick={props.onShowCart}>
        Submit Workout
      </button>
    </header>
  );
};

export default Header;
