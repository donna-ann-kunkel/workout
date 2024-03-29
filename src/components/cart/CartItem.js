import styles from "./CartItem.module.css";
import { Fragment, useContext } from "react";
import CartContext from "../../store/cart-context";

const CartItem = (props) => {
  const cartCtx = useContext(CartContext);

  if (props.exerciseName === "undefined") return;

  const removeItemHandler = (id) => {
    cartCtx.removeItems(id);
  };

  const repDisplay = props.repArray.map((item) => {
    console.log(props.repArray);
    return (
      <Fragment>
        <li>
          {item.reps} reps {item.weight} {item.unit}
        </li>
        <button
          className={styles.button}
          onClick={removeItemHandler.bind(null, item.id)}
        >
          Remove
        </button>
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
