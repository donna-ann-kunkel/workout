import styles from "./WorkoutItem.module.css";
import CartContext from "../store/cart-context";
import { useContext, useRef } from "react";

const WorkoutItem = (props) => {
  const cartCtx = useContext(CartContext);
  const refInputRep = useRef();
  const refInputWeight = useRef();

  const addToCartHandler = (event) => {
    event.preventDefault();
    const enteredReps = refInputRep.current.value;
    const enteredWeight = refInputWeight.current.value;
    document.getElementById("repNumber").value = "";
    document.getElementById("weight").value = "";

    cartCtx.addItems({
      id: Math.random(),
      exerciseName: props.name,
      weight: enteredWeight,
      reps: enteredReps,
    });
  };

  return (
    <li className={styles.list}>
      <div>
        <h3>{props.name}</h3>
        <form>
          <div className={styles.input}>
            <label htmlFor="repNumber"># of Reps</label>
            <input id="repNumber" type="number" ref={refInputRep} min={0} />
            <label htmlFor="weight">Weight</label>
            <input id="weight" type="number" ref={refInputWeight} min={0} />
            <button className={styles.button} onClick={addToCartHandler}>
              Add to Workout
            </button>
          </div>
        </form>
      </div>
    </li>
  );
};

export default WorkoutItem;
