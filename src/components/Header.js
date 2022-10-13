import styles from "./Header.module.css";

const Header = (props) => {
  return (
    <header className={styles.header}>
      <h1>Builder Buddy</h1>
      <button onClick={props.onShowCart}>Workout</button>
    </header>
  );
};

export default Header;
