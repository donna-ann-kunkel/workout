import styles from "./HistoryItem.module.css";
import { Fragment } from "react";

const HistoryItem = (props) => {
  console.log(props.reducedHistory);
  console.log(props.date);
  // const repDisplay = props.repArray.map((item) => {
  //   console.log(props.repArray);
  //   return (
  //     <Fragment>
  //       <li>
  //         {item.reps} reps {item.weight} lb
  //       </li>
  //     </Fragment>
  //   );
  // });

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
