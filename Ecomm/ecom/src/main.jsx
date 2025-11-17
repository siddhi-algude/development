import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css";
import { CartProvider } from "./context/CartContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
     <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <SearchProvider>
          <Suspense fallback={<div className="container-max py-12">Loading app…</div>}>
            <App />
          </Suspense>
          </SearchProvider>
        </WishlistProvider>
      </CartProvider>
     </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);
