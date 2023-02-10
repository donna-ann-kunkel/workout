import Header from "./components/Header";
import Workout from "./components/Workout";
import Modal from "./components/Modal";

import CartProvider from "./store/CartProvider";
import { useState } from "react";
import WorkoutHistory from "./components/WorkoutHistory";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const [historyIsShown, setHistoryIsShown] = useState(false);
  const [workoutFormIsShown, setWorkoutFormIsShown] = useState(true);

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
    setHistoryIsShown(false);
  };

  const showWorkoutHistoryHandler = () => {
    setHistoryIsShown(true);
    setWorkoutFormIsShown(false);
  };

  return (
    <CartProvider>
      {cartIsShown && <Modal onClose={hideCartHandler} />}
      {historyIsShown && (
        <WorkoutHistory
          onClose={hideHistoryHandler && showWorkoutFormHandler}
        />
      )}
      <Header
        onShowHistory={showWorkoutHistoryHandler}
        onShowCart={showCartHandler}
        onShowForm={showWorkoutFormHandler}
      />
      {workoutFormIsShown && <Workout />}
    </CartProvider>
  );
}

export default App;
