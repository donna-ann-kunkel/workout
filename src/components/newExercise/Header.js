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

  const showHistoryHandler = () => {
    closeMenuHandler();
    props.onShowHistory();
  };

  const showFormHandler = () => {
    closeMenuHandler();
    props.onShowForm();
  };

  const showCartHandler = () => {
    closeMenuHandler();
    props.onShowCart();
  };

  return (
    <header className={styles.header}>
      <h1>Builder Buddy</h1>

      {menuIsShown && (
        <nav className={styles.nav}>
          <button className={styles.button} onClick={showFormHandler}>
            Enter New Exercises
          </button>
          <button className={styles.button} onClick={showHistoryHandler}>
            View Workout History
          </button>

          <button className={styles.button} onClick={showCartHandler}>
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
