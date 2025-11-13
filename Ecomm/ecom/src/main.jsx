import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { CartProvider } from "./context/CartContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <CartProvider>
        <Suspense fallback={<div className="container-max py-12">Loading app…</div>}>
          <App />
        </Suspense>
      </CartProvider>
    </BrowserRouter>
  </React.StrictMode>
);
