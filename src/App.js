import Header from "./components/newExercise/Header";
import Workout from "./components/newExercise/Workout";
import Modal from "./components/cart/Modal";
import SignIn from "./components/signIn/SignIn";

import CartProvider from "./store/CartProvider";
import { useState } from "react";
import WorkoutHistory from "./components//history/WorkoutHistory";
import signIn from "./components/signIn/SignIn";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [historyIsShown, setHistoryIsShown] = useState(false);
  const [workoutFormIsShown, setWorkoutFormIsShown] = useState(true);
  const [signInIsShown, setSignInIsShown] = useState(true);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  const hideHistoryHandler = () => {
    setHistoryIsShown(false);
  };

  const showWorkoutFormHandler = () => {
    setWorkoutFormIsShown(true);
    setSignInIsShown(false);
    setHistoryIsShown(false);
  };

  const showWorkoutHistoryHandler = () => {
    setHistoryIsShown(true);
    setWorkoutFormIsShown(false);
    setSignInIsShown(false);
  };
  const signInHandler = () => {
    setSignInIsShown(true);
    setWorkoutFormIsShown(false);
    setHistoryIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Modal onClose={hideCartHandler} />}
      {historyIsShown && (
        <WorkoutHistory
          onClose={hideHistoryHandler && showWorkoutFormHandler}
        />
      )}
      {signInIsShown && <SignIn />}
      <Header
        onShowHistory={showWorkoutHistoryHandler}
        onShowCart={showCartHandler}
        onShowForm={showWorkoutFormHandler}
        onShowSignIn={signInHandler}
      />
      {workoutFormIsShown && !signInIsShown && <Workout />}
    </CartProvider>
  );
}

export default App;
