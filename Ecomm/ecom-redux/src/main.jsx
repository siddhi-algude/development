// // import React, { Suspense } from "react";
// // import ReactDOM from "react-dom/client";
// // import { BrowserRouter } from "react-router-dom";
// // import App from "./App.jsx";
// // import "./index.css";
// // import { CartProvider } from "./context/CartContext.jsx";
// // import { WishlistProvider } from "./context/WishlistContext.jsx";
// // import { SearchProvider } from "./context/SearchContext.jsx";
// // import { AuthProvider } from "./context/AuthContext.jsx";

// // ReactDOM.createRoot(document.getElementById("root")).render(
// //   <React.StrictMode>
// //     <BrowserRouter>
// //      <AuthProvider>
// //       <CartProvider>
// //         <WishlistProvider>
// //           <SearchProvider>
// //           <Suspense fallback={<div className="container-max py-12">Loading app…</div>}>
// //             <App />
// //           </Suspense>
// //           </SearchProvider>
// //         </WishlistProvider>
// //       </CartProvider>
// //      </AuthProvider>
// //     </BrowserRouter>
// //   </React.StrictMode>
// // );
// import React from "react";
// import ReactDOM from "react-dom/client";
// import { BrowserRouter } from "react-router-dom";
// import { Provider } from "react-redux";

// import store from "./store"; 
// import App from "./App";

// import { AuthProvider } from "./context/AuthContext";
// import { SearchProvider } from "./context/SearchContext";
// import { WishlistProvider } from "./context/WishlistContext";
// import { CartProvider } from "./context/CartContext";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <Provider store={store}>
//       <BrowserRouter>
//         <AuthProvider>
//           <SearchProvider>
//             <WishlistProvider>
//               <CartProvider>
//                 <App />
//               </CartProvider>
//             </WishlistProvider>
//           </SearchProvider>
//         </AuthProvider>
//       </BrowserRouter>
//     </Provider>
//   </React.StrictMode>
// );
// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import App from "./App";
import "./index.css";
import store from "./store";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
