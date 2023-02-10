import styles from "./Workout.module.css";
import { AiOutlineSearch } from "react-icons/ai";
import { useRef } from "react";

const Search = (props) => {
  const searchInputRef = useRef();

  const searchHandler = (event) => {
    event.preventDefault();
    const enteredSearch = searchInputRef.current.value;
    props.onSearch(enteredSearch);
    searchInputRef.current.value = "";
  };

  return (
    <div>
      <input type="text" class={styles.input} ref={searchInputRef}></input>
      <button className={styles.button} onClick={searchHandler}>
        <AiOutlineSearch className={styles.icon} />
      </button>
    </div>
  );
};

export default Search;
