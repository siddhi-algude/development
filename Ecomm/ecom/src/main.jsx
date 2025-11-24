import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import "./index.css"; 
import { HelmetProvider } from "react-helmet-async";
import { CartProvider } from "./context/CartContext.jsx";
import { WishlistProvider } from "./context/WishlistContext.jsx";
import { SearchProvider } from "./context/SearchContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./i18n"; 

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <React.Suspense fallback="... loading">
   <HelmetProvider>
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
   </HelmetProvider>
   </React.Suspense>
  </React.StrictMode>
);
