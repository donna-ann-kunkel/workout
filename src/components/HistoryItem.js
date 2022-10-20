import styles from "./HistoryItem.module.css";

const HistoryItem = (props) => {
  return (
    <li className={styles.historyItem}>
      <div>
        <h2>{props.name}</h2>
        <div>
          <span>{props.weight} </span>
          <span>{props.unit}</span>
          <span> {props.reps} reps</span>
        </div>
      </div>
    </li>
  );
};

export default HistoryItem;
