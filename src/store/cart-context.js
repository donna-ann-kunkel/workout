import React from "react";

const CartContext = React.createContext({
  exercises: [{ exercise: "", weight: 0, reps: 0 }],

  addItems: (item) => {},
  removeItems: (id) => {},
  clearCart: () => {},
});

export default CartContext;
