import Header from "./components/Header";
import Workout from "./components/Workout";
import Modal from "./components/Modal";
import { Fragment, useState } from "react";

function App() {
  const [cartIsShown, setCartIsShown] = useState(false);
  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };
  return (
    <Fragment>
      {cartIsShown && <Modal onClose={hideCartHandler} />}
      <Header onShowCart={showCartHandler} />
      <Workout />
    </Fragment>
  );
}

export default App;
