import styles from "./CartItem.module.css";
import { Fragment } from "react";

const CartItem = (props) => {
  console.log(props.exerciseName.length);
  if (props.exerciseName === "undefined") return;
  const repDisplay = props.repArray.map((item) => {
    return (
      <Fragment>
        <li>
          {item.reps} reps {item.weight} lb
        </li>
        <button className={styles.button}>Remove</button>
      </Fragment>
    );
  });

  return (
    <div className={styles.cartItem}>
      <div>
        <h2>{props.exerciseName}</h2>
        <div>{repDisplay}</div>
      </div>
    </div>
  );
};

export default CartItem;
