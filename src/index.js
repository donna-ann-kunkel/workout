import ReactDOM from "react-dom/client";

import "./index.css";
import App from "./App";
import CartContext, { CartContextProvider } from "./store/cart-context";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
