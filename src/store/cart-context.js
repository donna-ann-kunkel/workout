import React from "react";

const CartContext = React.createContext({
  exercises: [{ exercise: "", weight: 0, reps: 0 }],

  addItem: (item) => {},
});

export default CartContext;
