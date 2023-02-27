import styles from "./WorkoutItem.module.css";
import CartContext from "../../store/cart-context";
import { useContext, useRef, Fragment } from "react";

const WorkoutItem = (props) => {
  const cartCtx = useContext(CartContext);
  const refInputRep = useRef();
  const refInputWeight = useRef();
  const refSelectUnit = useRef();

  const addToCartHandler = (event) => {
    event.preventDefault();
    const enteredReps = refInputRep.current.value;
    const enteredWeight = refInputWeight.current.value;
    const enteredUnit = refSelectUnit.current.value;
    cartCtx.addItems({
      id: Math.random(),
      exerciseName: props.name,
      weight: enteredWeight,
      reps: enteredReps,
      unit: enteredUnit,
    });
    refInputRep.current.value = "";
    refInputWeight.current.value = "";
  };

  return (
    <li className={styles.list}>
      <div>
        <h3>{props.name}</h3>
        <form id="addExerciseForm">
          <div className={styles.input}>
            <label htmlFor="repNumber"># of Reps</label>
            <input
              className="input"
              id="repNumber"
              type="number"
              ref={refInputRep}
              min={0}
            />
            <label htmlFor="weight">Weight</label>
            <input
              className="input"
              id="weight"
              type="number"
              ref={refInputWeight}
              min={0}
            />

            <select name="unit" id="unit" ref={refSelectUnit}>
              <option value="lb">lb</option>
              <option value="kg">kg</option>
            </select>
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
