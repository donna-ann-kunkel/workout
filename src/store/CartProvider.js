import { useReducer } from "react";
import CartContext from "./cart-context";

const defaultCartState = {
  exercises: [{}],
};
const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedExercise = [...state.exercises, action.item];

    return {
      exercises: updatedExercise,
    };
  }
  if (action.type === "CLEAR") {
    return defaultCartState;
  }
  if (action.type === "REMOVE") {
    console.log(state.exercises, action);

    // const existingCartItemIndex = state.exercises.findIndex(
    //   (item) => item.id === action.id
    // );

    const updatedExercises = state.exercises.filter(
      (item) => item.id !== action.id
    );
    return {
      exercises: updatedExercises,
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

  const removeItemFromCartHandler = (id) => {
    dispatchCartAction({ type: "REMOVE", id: id });
  };
  const clearCartHandler = (item) => {
    dispatchCartAction({ type: "CLEAR", item: item });
  };
  const cartContext = {
    exercise: cartState.exercises,
    addItems: addItemToCartHandler,
    removeItems: removeItemFromCartHandler,
    clearCart: clearCartHandler,
  };

  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;
