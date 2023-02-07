import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import styles from "./Header.module.css";
import { useState } from "react";

const Header = (props) => {
  const [menuIsShown, setMenuIsShown] = useState(false);

  const showMenuHandler = () => {
    setMenuIsShown(true);
  };
  const closeMenuHandler = () => {
    setMenuIsShown(false);
  };

  return (
    <header className={styles.header}>
      <h1>Builder Buddy</h1>

      {menuIsShown && (
        <nav className={styles.nav}>
          <button className={styles.button} onClick={props.onShowHistory}>
            View Workout History
          </button>
          <button className={styles.button} onClick={props.onShowForm}>
            Enter New Exercises
          </button>
          <button className={styles.button} onClick={props.onShowCart}>
            Submit Workout
          </button>
          <AiOutlineClose className={styles.icon} onClick={closeMenuHandler} />
        </nav>
      )}

      {!menuIsShown && (
        <AiOutlineMenu className={styles.icon} onClick={showMenuHandler} />
      )}
    </header>
  );
};

export default Header;
