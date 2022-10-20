import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  exercises: [{}],
};
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedExercise = [...state.exercises, action.item];
    console.log(updatedExercise);

    return {
      exercises: updatedExercise,
    };
  }

  return defaultCartState;
};

const CartProvider = (props) => {
  const [cartState, dispatchCartAction] = useReducer(
    cartReducer,
    defaultCartState
  );
  const addItemToCartHandler = (item) => {
    dispatchCartAction({ type: "ADD", item: item });
  };

  const cartContext = {
    exercise: cartState.exercises,
    addItems: addItemToCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
