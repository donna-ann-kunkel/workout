import { Fragment, useContext, useState } from "react";
import CartContext from "../store/cart-context";

import styles from "./Modal.module.css";
import { ReactDOM } from "react-dom";
import CartItem from "./CartItem";

const Modal = (props) => {
  const portalElement = document.getElementById("overlays");
  const cartCtx = useContext(CartContext);
  const [didSubmit, setDidSubmit] = useState(false);

  const reducedData = cartCtx.exercise.reduce(
    (prevName, { exerciseName, reps, weight, id }) => {
      (prevName[exerciseName] = prevName[exerciseName] || []).push({
        reps: reps,
        weight: weight,
        id: id,
      });
      return prevName;
    },
    {}
  );

  const exerciseNonNull = cartCtx.exercise.filter(
    (arr) => Object.keys(arr).length !== 0
  );

  const todayDate = new Date().toLocaleDateString("en-us", {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  const submitWorkoutHandler = async () => {
    await fetch(
      "https://udemy-react-http-d7691-default-rtdb.firebaseio.com/userExercise.json",
      {
        method: "POST",
        body: JSON.stringify({
          userId: "012345",
          exerciseData: [
            {
              exercise: exerciseNonNull,
              date: todayDate,
            },
          ],
        }),
      }
    );

    setDidSubmit(true);
    cartCtx.clearCart();
    props.onClose();
  };

  const cartItems = (
    <ul className={styles.list}>
      {Object.entries(reducedData).map((item) => (
        <CartItem
          key={item[1].id}
          id={item[1].id}
          exerciseName={item[0]}
          repArray={item[1]}
        />
      ))}
    </ul>
  );

  return (
    <Fragment>
      <div className={styles.backdrop} onClick={props.onClose}></div>
      <div className={styles.modal}>
        <div>
          <div>{cartItems}</div>
        </div>

        <button className={styles.button} onClick={props.onClose}>
          Close
        </button>
        <button className={styles.button} onClick={submitWorkoutHandler}>
          Complete Workout
        </button>
      </div>
    </Fragment>
  );
};
export default Modal;
