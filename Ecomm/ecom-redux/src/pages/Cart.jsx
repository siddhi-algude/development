// // // import { Link } from "react-router-dom";
// // // import { useCart } from "../context/CartContext";
// // // import QuantityInput from "../components/QuantityInput";
// // // import Price from "../components/Price";
// // // import Button from "../components/Button";
// // // import withPageTitle from "../hoc/withPageTitle";

// // // function CartPage() {
// // //   const { items, setQty, removeItem, clear, subtotal, tax, shipping, total, taxRate } = useCart();

// // //   if (items.length === 0) {
// // //     return (
// // //       <div className="text-center py-16 space-y-4">
// // //         <p className="text-xl">Your cart is empty</p>
// // //         <Link to="/" className="btn-primary">Continue shopping</Link>
// // //       </div>
// // //     );
// // //   }

// // //   return (
// // //     <div className="grid lg:grid-cols-3 gap-8">
// // //       <div className="lg:col-span-2 space-y-4">
// // //         {items.map(item => (
// // //           <div key={item.id} className="card p-4 flex gap-4">
// // //             <img src={item.image} alt={item.title} className="h-24 w-24 object-contain" />
// // //             <div className="flex-1">
// // //               <h3 className="font-medium line-clamp-2">{item.title}</h3>
// // //               <p className="text-gray-600"><Price amount={item.price} /></p>
// // //               <div className="mt-2 flex items-center gap-4">
// // //                 <QuantityInput value={item.qty} onChange={(q) => setQty(item.id, q)} />
// // //                 <Button variant="ghost" onClick={() => removeItem(item.id)}>Remove</Button>
// // //               </div>
// // //             </div>
// // //             <div className="text-right font-semibold"><Price amount={item.price * item.qty} /></div>
// // //           </div>
// // //         ))}
// // //         <Button variant="ghost" onClick={clear}>Clear Cart</Button>
// // //       </div>

// // //       <aside className="card p-6 h-fit space-y-4">
// // //         <h2 className="text-lg font-semibold">Order Summary</h2>
// // //         <div className="flex justify-between text-sm"><span>Subtotal</span><span><Price amount={subtotal} /></span></div>
// // //         <div className="flex justify-between text-sm"><span>Tax ({Math.round(taxRate*100)}%)</span><span><Price amount={tax} /></span></div>
// // //         <div className="flex justify-between text-sm"><span>Shipping</span><span>{shipping === 0 ? "Free" : <Price amount={shipping} />}</span></div>
// // //         <hr />
// // //         <div className="flex justify-between text-base font-semibold"><span>Total</span><span><Price amount={total} /></span></div>
// // //         <Button className="w-full">Checkout</Button>
// // //       </aside>
// // //     </div>
// // //   );
// // // }

// // // export default withPageTitle(CartPage, "ShopLite · Cart");

// // import withErrorBoundary from "../hoc/withErrorBoundary";
// // import withPageTitle from "../hoc/withPageTitle";
// // import { useCart } from "../context/CartContext";
// // import QuantityInput from "../components/QuantityInput";
// // import Price from "../components/Price";
// // import Button from "../components/Button";

// // function CartPage() {
// //   const { items, updateItem, removeItem, clearCart } = useCart();

// //   const normalized = items.map((item) => {
// //     const product = item.product ?? item;
// //     const quantity = item.quantity ?? 1;
// //     return { product, quantity };
// //   });

// //   const subtotal = normalized.reduce(
// //     (sum, { product, quantity }) => sum + product.price * quantity,
// //     0
// //   );
// //   const tax = subtotal * 0.1;
// //   const total = subtotal + tax;

// //   const hasItems = normalized.length > 0;

// //   return (
// //     <div className="container-max py-6 lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)] gap-8">
// //       {/* Left: items list */}
// //       <section className="space-y-4 lg:max-h-[calc(100vh-200px)] lg:overflow-y-auto pr-1">
// //         {!hasItems && (
// //           <div className="card p-8 text-center text-gray-500">
// //             Your cart is empty. Start adding some SwiftKart deals!
// //           </div>
// //         )}

// //         {normalized.map(({ product, quantity }) => (
// //           <div
// //             key={product.id}
// //             className="card flex flex-col sm:flex-row items-center gap-4 p-4 hover:shadow-md hover:-translate-y-0.5"
// //           >
// //             <img
// //               src={product.image}
// //               alt={product.title}
// //               className="w-24 h-24 object-contain bg-white rounded-xl"
// //             />

// //             <div className="flex-1 self-stretch flex flex-col justify-between gap-2">
// //               <div className="flex items-center justify-between">
// //                 <h2 className="font-semibold text-sm sm:text-base">
// //                   {product.title}
// //                 </h2>
// //                 <Price amount={product.price * quantity} className="font-semibold" />
// //               </div>

// //               <p className="text-xs text-gray-500">
// //                 <Price amount={product.price} /> each
// //               </p>

// //               <div className="flex items-center gap-3">
// //                 <QuantityInput
// //                   value={quantity}
// //                   onChange={(q) => updateItem(product.id, q)}
// //                 />
// //                 <Button
// //                   variant="ghost"
// //                   className="px-4"
// //                   onClick={() => removeItem(product.id)}
// //                 >
// //                   Remove
// //                 </Button>
// //               </div>
// //             </div>
// //           </div>
// //         ))}
// //       </section>

// //       {/* Right: order summary */}
// //       <aside className="mt-6 lg:mt-0">
// //         <div className="card p-6 space-y-4 lg:sticky lg:top-24">
// //           <h2 className="text-lg font-semibold">Order Summary</h2>

// //           <div className="space-y-2 text-sm">
// //             <div className="flex justify-between">
// //               <span>Subtotal</span>
// //               <Price amount={subtotal} />
// //             </div>
// //             <div className="flex justify-between">
// //               <span>Tax (10%)</span>
// //               <Price amount={tax} />
// //             </div>
// //             <div className="flex justify-between">
// //               <span>Shipping</span>
// //               <span className="font-medium">Free</span>
// //             </div>
// //             <div className="border-t pt-3 mt-2 flex justify-between font-semibold">
// //               <span>Total</span>
// //               <Price amount={total} />
// //             </div>
// //           </div>

// //           <Button className="w-full rounded-full">Checkout</Button>

// //           {hasItems && (
// //             <button
// //               type="button"
// //               className="w-full text-xs text-gray-500 underline mt-2"
// //               onClick={clearCart}
// //             >
// //               Clear cart
// //             </button>
// //           )}
// //         </div>
// //       </aside>
// //     </div>
// //   );
// // }

// // export default withErrorBoundary(withPageTitle(CartPage, "SwiftKart · Cart"));

// import { useNavigate } from "react-router-dom";
// import withErrorBoundary from "../hoc/withErrorBoundary";
// import withPageTitle from "../hoc/withPageTitle";
// import { useCart } from "../context/CartContext";
// import QuantityInput from "../components/QuantityInput";
// import Price from "../components/Price";
// import Button from "../components/Button";

// function CartPage() {
//   const navigate = useNavigate();
//   const { items, updateItem, removeItem, clearCart } = useCart();

//   // Normalize structure (your existing logic)
//   const normalized = items.map((item) => {
//     const product = item.product ?? item;
//     const quantity = item.quantity ?? 1;
//     return { product, quantity };
//   });

//   const hasItems = normalized.length > 0;

//   const subtotal = normalized.reduce(
//     (sum, { product, quantity }) => sum + product.price * quantity,
//     0
//   );
//   const tax = subtotal * 0.1;
//   const total = subtotal + tax;

//   const handleCheckout = () => {
//     if (!hasItems) return;
//     navigate("/checkout");
//   };

//   return (
//     <div className="container-max py-6 lg:grid lg:grid-cols-[minmax(0,2fr)_minmax(320px,1fr)] gap-8">
      
//       {/* LEFT: Cart Items */}
//       <section className="space-y-4 lg:max-h-[calc(100vh-200px)] lg:overflow-y-auto pr-1">

//         {!hasItems && (
//           <div className="card p-8 text-center text-gray-500">
//             Your cart is empty. Start adding some SwiftKart deals!
//           </div>
//         )}

//         {normalized.map(({ product, quantity }) => (
//           <div
//             key={product.id}
//             className="card flex flex-col sm:flex-row items-center gap-4 p-4 hover:shadow-md hover:-translate-y-0.5"
//           >
//             <img
//               src={product.image}
//               alt={product.title}
//               className="w-24 h-24 object-contain bg-white rounded-xl"
//             />

//             <div className="flex-1 flex flex-col gap-2">
//               <div className="flex items-center justify-between">
//                 <h2 className="font-semibold text-sm sm:text-base">
//                   {product.title}
//                 </h2>
//                 <Price amount={product.price * quantity} className="font-semibold" />
//               </div>

//               <p className="text-xs text-gray-500">
//                 <Price amount={product.price} /> each
//               </p>

//               <div className="flex items-center gap-3">
//                 <QuantityInput
//                   value={quantity}
//                   onChange={(q) => updateItem(product.id, q)}
//                 />

//                 <Button
//                   variant="ghost"
//                   className="px-4"
//                   onClick={() => removeItem(product.id)}
//                 >
//                   Remove
//                 </Button>
//               </div>
//             </div>
//           </div>
//         ))}
//       </section>

//       {/* RIGHT: Order Summary */}
//       <aside className="mt-6 lg:mt-0">
//         <div className="card p-6 space-y-4 lg:sticky lg:top-24">
//           <h2 className="text-lg font-semibold">Order Summary</h2>

//           <div className="space-y-2 text-sm">
//             <div className="flex justify-between">
//               <span>Subtotal</span>
//               <Price amount={subtotal} />
//             </div>

//             <div className="flex justify-between">
//               <span>Tax (10%)</span>
//               <Price amount={tax} />
//             </div>

//             <div className="flex justify-between">
//               <span>Shipping</span>
//               <span className="font-medium">Free</span>
//             </div>

//             <div className="border-t pt-3 mt-2 flex justify-between font-semibold">
//               <span>Total</span>
//               <Price amount={total} />
//             </div>
//           </div>

//           {/*  ✅ Proceed to Checkout Button  */}
//           <button
//             onClick={handleCheckout}
//             disabled={!hasItems}
//             className={`w-full rounded-full py-2 text-sm font-medium mt-2 transition 
//               ${hasItems 
//                 ? "bg-black text-white hover:bg-gray-900" 
//                 : "bg-gray-300 text-gray-500 cursor-not-allowed"}`}
//           >
//             Proceed to Checkout
//           </button>

//           {hasItems && (
//             <button
//               type="button"
//               className="w-full text-xs text-gray-500 underline mt-2"
//               onClick={clearCart}
//             >
//               Clear cart
//             </button>
//           )}
//         </div>
//       </aside>
       
//     </div>
//   );
// }

// export default withErrorBoundary(
//   withPageTitle(CartPage, "SwiftKart · Cart")
// );

 // src/pages/Cart.jsx
import { useSelector, useDispatch } from "react-redux";
import {
  updateQuantity,
  removeItem,
  clearCart, 
} from "../store/slices/cartSlice";

import Price from "../components/Price";
import QuantityInput from "../components/QuantityInput";
import Button from "../components/Button";

export default function CartPage() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const hasItems = items.length > 0;

  return (
    <div className="container-max py-6 lg:grid lg:grid-cols-[2fr_1fr] gap-8">
      {/* LEFT LIST */}
      <section className="space-y-4">
        {!hasItems && (
          <div className="card p-8 text-center text-gray-500">
            Your cart is empty.
          </div>
        )}

        {items.map((item) => (
          <div
            key={item.id}
            className="card p-4 flex flex-col sm:flex-row gap-4 items-center"
          >
            <img
              src={item.image}
              alt={item.title}
              className="h-24 w-24 object-contain"
            />

            <div className="flex-1">
              <h2 className="font-semibold">{item.title}</h2>

              <p className="text-sm text-gray-500">
                <Price amount={item.price} /> each
              </p>

              <div className="mt-2 flex items-center gap-3">
                <QuantityInput
                  value={item.quantity}
                  onChange={(q) =>
                    dispatch(updateQuantity({ id: item.id, quantity: q }))
                  }
                />

                <Button
                  variant="ghost"
                  onClick={() => dispatch(removeItem(item.id))}
                >
                  Remove
                </Button>
              </div>
            </div>

            <Price
              amount={item.price * item.quantity}
              className="font-semibold"
            />
          </div>
        ))}
      </section>

      {/* RIGHT SUMMARY */}
      <aside className="card p-6 h-fit space-y-3 mt-6 lg:mt-0">
        <h2 className="text-lg font-semibold">Order Summary</h2>

        <div className="flex justify-between text-sm">
          <span>Subtotal</span>
          <Price amount={subtotal} />
        </div>

        <div className="flex justify-between text-sm">
          <span>Tax (10%)</span>
          <Price amount={tax} />
        </div>

        <div className="border-t pt-3 flex justify-between font-semibold">
          <span>Total</span>
          <Price amount={total} />
        </div>

        <Button className="w-full">Checkout</Button>

        {hasItems && (
          <button
            className="text-xs underline text-gray-500 w-full"
            onClick={() => dispatch(clearCart())}
          >
            Clear Cart
          </button>
        )}
      </aside>
    </div>
  );
}
