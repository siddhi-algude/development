// // // import { lazy, Suspense } from "react";
// // // import { Routes, Route } from "react-router-dom";
// // // import Layout from "./layouts/Layout";
// // // import Loader from "./components/Loader"; 

// // // const Home = lazy(() => import("./pages/Home"));
// // // const ProductDetails = lazy(() => import("./pages/ProductDetails"));
// // // const Cart = lazy(() => import("./pages/Cart"));
// // // const Contact = lazy(() => import("./pages/Contact"));
// // // const NotFound = lazy(() => import("./pages/NotFound"));
// // // const WishlistPage = lazy(() => import("./pages/Wishlist"))

// // // export default function App() {
// // //   return (
// // //     <Layout>
// // //       <Suspense fallback={<Loader />}>
// // //         <Routes>
// // //           <Route path="/" element={<Home />} />
// // //           <Route path="/product/:id" element={<ProductDetails />} />
// // //           <Route path="/cart" element={<Cart />} />
// // //           <Route path="/contact" element={<Contact />} />
// // //           <Route path="*" element={<NotFound />} />
// // //           <Route path="/wishlist" element={<WishlistPage />} />
// // //         </Routes>
// // //       </Suspense>
// // //     </Layout>
// // //   ); 
// // // }
// // import { lazy, Suspense } from "react";
// // import { Routes, Route } from "react-router-dom";
// // import Layout from "./layouts/Layout";
// // import Loader from "./components/Loader";
// // import SearchResults from "./pages/SearchResult";

// // const Home = lazy(() => import("./pages/Home"));
// // const ProductDetails = lazy(() => import("./pages/ProductDetails"));
// // const Cart = lazy(() => import("./pages/Cart"));
// // const Contact = lazy(() => import("./pages/Contact"));
// // const NotFound = lazy(() => import("./pages/NotFound"));
// // const WishlistPage = lazy(() => import("./pages/Wishlist"));
// // const CategoryPage = lazy(() => import("./pages/CategoryPage")); // NEW

// // export default function App() {
// //   return (
// //     <Layout>
// //       <Suspense fallback={<Loader />}>
// //         <Routes>
// //           <Route path="/" element={<Home />} />
// //           <Route path="/product/:id" element={<ProductDetails />} />
// //           <Route path="/cart" element={<Cart />} />
// //           <Route path="/contact" element={<Contact />} />
// //           <Route path="/wishlist" element={<WishlistPage />} />

// //           {/* NEW Category route */}
// //           <Route path="/category/:name" element={<CategoryPage />} />
// //           <Route path="/search/*" element={<SearchResults />} />
// //           <Route path="*" element={<NotFound />} />
// //         </Routes>
// //       </Suspense>
// //     </Layout>
// //   );
// // }

// // src/App.jsx
// import { lazy, Suspense } from "react";
// import { Routes, Route } from "react-router-dom";
// import Layout from "./layouts/Layout";
// import Loader from "./components/Loader";

// const Home = lazy(() => import("./pages/Home"));
// const ProductDetails = lazy(() => import("./pages/ProductDetails"));
// const Cart = lazy(() => import("./pages/Cart"));
// const Contact = lazy(() => import("./pages/Contact"));
// const NotFound = lazy(() => import("./pages/NotFound"));
// const WishlistPage = lazy(() => import("./pages/Wishlist"));
// const CategoryPage = lazy(() => import("./pages/CategoryPage"));
// const SearchResult = lazy(() => import("./pages/SearchResult"));

// // new
// const Login = lazy(() => import("./pages/Login"));
// const Signup = lazy(() => import("./pages/Signup"));
// const OtpVerify = lazy(() => import("./pages/OtpVerify"));

// export default function App() {
//   return (
//     <Layout>
//       <Suspense fallback={<Loader />}>
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/product/:id" element={<ProductDetails />} />
//           <Route path="/cart" element={<Cart />} />
//           <Route path="/contact" element={<Contact />} />
//           <Route path="/wishlist" element={<WishlistPage />} />
//           <Route path="/category/:name" element={<CategoryPage />} />
//           <Route path="/search" element={<SearchResult />} />

//           {/* auth */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/otp" element={<OtpVerify />} />

//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </Suspense>
//     </Layout>
//   );
// }
// src/App.jsx
import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Loader from "./components/Loader";

const Home = lazy(() => import("./pages/Home"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const Cart = lazy(() => import("./pages/Cart"));
const Contact = lazy(() => import("./pages/Contact"));
const NotFound = lazy(() => import("./pages/NotFound"));
const WishlistPage = lazy(() => import("./pages/Wishlist"));
const CategoryPage = lazy(() => import("./pages/CategoryPage"));
const SearchResult = lazy(() => import("./pages/SearchResult"));

const Login = lazy(() => import("./pages/Login"));
const Signup = lazy(() => import("./pages/Signup"));
const OtpVerify = lazy(() => import("./pages/OtpVerify"));

// ✅ new
const Checkout = lazy(() => import("./pages/Checkout"));
const OrderSuccess = lazy(() => import("./pages/OrderSuccess"));

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/category/:name" element={<CategoryPage />} />
          <Route path="/search" element={<SearchResult />} />

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/otp" element={<OtpVerify />} />

          {/* ✅ new routes */}
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}
