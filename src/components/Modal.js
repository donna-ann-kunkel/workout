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
    (prevName, { exerciseName, reps, weight }) => {
      (prevName[exerciseName] = prevName[exerciseName] || []).push({
        reps: reps,
        weight: weight,
      });
      return prevName;
    },
    {}
  );

  const todayDate = new Date();
  console.log(todayDate);
  console.log(cartCtx.exercise);
  const submitWorkoutHandler = async () => {
    await fetch(
      "https://udemy-react-http-d7691-default-rtdb.firebaseio.com/userExercise.json",
      {
        method: "POST",
        body: JSON.stringify({
          userId: "012345",
          exerciseData: [
            {
              exercise: cartCtx.exercise,
              date: todayDate,
            },
          ],
        }),
      }
    );

    setDidSubmit(true);
    // cartCtx.clearCart();  //need to add this to the provider
  };

  const cartItems = (
    <ul>
      {Object.entries(reducedData).map((item) => (
        <CartItem exerciseName={item[0]} repArray={item[1]} />
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
