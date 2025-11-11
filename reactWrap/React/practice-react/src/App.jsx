// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
      
//     </>
//   )
// }

// export default App // default snippet


//------------------------ 2 product card snippet
// import ProductCard from "./components/ProductCard";

// const product = {
//   id: "sku_hoodie_001",
//   title: "Organic Cotton Hoodie",
//   brand: "Northwind",
//   images: [
//     "../../public/hoodie.webp",
//   ],
//   price: 49.0,
//   compareAtPrice: 69.0,
//   rating: 4.4,
//   reviewsCount: 281,
//   currency: "USD",
//   locale: "en-US", 
//   variants: [
//     { id: "v1", color: "Black", size: "S", stock: 0 },
//     { id: "v2", color: "Black", size: "M", stock: 3 },
//     { id: "v3", color: "Black", size: "L", stock: 6 },
//     { id: "v4", color: "Olive", size: "M", stock: 4 },
//     { id: "v5", color: "Olive", size: "L", stock: 0 },
//     { id: "v6", color: "Blue", size: "One", stock: 12 }, // example of one-size variant
//   ],
// };

// export default function App() {
//   const handleAddToCart = (payload) => {
//     console.log("ADD TO CART", payload);
//     // here you would POST to your API or update global cart state/context
//     alert(`Added ${payload.qty} to cart ✅`);
//   };

//   const handleWishlist = (productId, next) => {
//     console.log("WISHLIST", { productId, next });
//     // call your API or update local persisted state
//   };

//   return (
//     <div style={{ padding: 24, fontFamily: "system-ui, Inter, Segoe UI, Arial" }}>
//       <h1>Store</h1>
//       <ProductCard
//         product={product}
//         onAddToCart={handleAddToCart}
//         onToggleWishlist={handleWishlist}
//       />
//     </div>
//   );
// }

// //3 --- key n lists
// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import ListView from './components/ListView'

// function App() {
//   const [count, setCount] = useState(0)
//   const products = ["Desk", "Chair", "Bookcase", "Door", "Window"];
//   return (
//     <>
//       <div className="App margin-top-24 padding-24 center-flex flex-column">
//       <ListView items={products}/>
//       </div>
//     </> 
//   )
// }

// export default App // default snippet


// practice lists keys 

// import { useMemo, useState } from "react";

// // React Mini‑App: Shopping Cart demonstrating keys + map/filter/reduce
// // - map: render rows
// // - filter: live search + remove items
// // - reduce: compute totals
// // - keys: toggle between stable id (correct) vs index (buggy) to observe behavior

// const initialProducts = [
//   { id: "p1", name: "Desk", price: 12000, qty: 1 },
//   { id: "p2", name: "Chair", price: 4500, qty: 2 },
//   { id: "p3", name: "Bookcase", price: 8000, qty: 1 },
//   { id: "p4", name: "Door", price: 6000, qty: 1 },
//   { id: "p5", name: "Window", price: 7000, qty: 3 },
// ];

// export default function App() {
//   const [items, setItems] = useState(initialProducts);
//   const [query, setQuery] = useState("");
//   const [useIndexKeys, setUseIndexKeys] = useState(false); // toggle to demo bug

//   // FILTER: live search by name (case-insensitive)
//   const visibleItems = useMemo(
//     () =>
//       items.filter((it) =>
//         it.name.toLowerCase().includes(query.trim().toLowerCase())
//       ),
//     [items, query]
//   );

//   // REDUCE: totals for quantity and amount
//   const { totalQty, totalAmount } = useMemo(() => {
//     return visibleItems.reduce(
//       (acc, it) => {
//         acc.totalQty += it.qty;
//         acc.totalAmount += it.qty * it.price;
//         return acc;
//       },
//       { totalQty: 0, totalAmount: 0 }
//     );
//   }, [visibleItems]);

//   function addAtTop() {
//     const id = Math.random().toString(36).slice(2, 8);
//     const names = ["Lamp", "Mat", "Shelf", "Pot", "Cushion", "Frame"];
//     const name = names[Math.floor(Math.random() * names.length)] + " " + id;
//     const price = 1000 + Math.floor(Math.random() * 9000);
//     setItems([{ id, name, price, qty: 1 }, ...items]);
//   }

//   function shuffle() {
//     setItems([...items].sort(() => Math.random() - 0.5));
//   }

//   function remove(id) {
//     // FILTER: remove by creating a new array without the id
//     setItems(items.filter((it) => it.id !== id));
//   }

//   function changeQty(id, delta) {
//     setItems(
//       items.map((it) => (it.id === id ? { ...it, qty: Math.max(0, it.qty + delta) } : it))
//     );
//   }

//   function rupees(n) {
//     return new Intl.NumberFormat("en-IN", { style: "currency", currency: "INR" }).format(n);
//   }

//   return (
//     <div className="min-h-screen p-6 flex flex-col items-center gap-4">
//       <h1 className="text-2xl font-bold">Shopping Cart — Keys + map/filter/reduce</h1>

//       <div className="flex gap-2 items-center flex-wrap">
//         <input
//           className="border rounded px-3 py-2"
//           placeholder="Search products..."
//           value={query}
//           onChange={(e) => setQuery(e.target.value)}
//         />
//         <button className="border rounded px-3 py-2" onClick={addAtTop}>
//           Add at top
//         </button>
//         <button className="border rounded px-3 py-2" onClick={shuffle}>
//           Shuffle order
//         </button>
//         <label className="flex items-center gap-2 ml-2">
//           <input
//             type="checkbox"
//             checked={useIndexKeys}
//             onChange={(e) => setUseIndexKeys(e.target.checked)}
//           />
//           Use index keys (buggy demo)
//         </label>
//       </div>

//       <CartTable
//         items={visibleItems}
//         removeItem={remove}
//         changeQty={changeQty}
//         useIndexKeys={useIndexKeys}
//         rupees={rupees}
//       />

//       <TotalsCard totalQty={totalQty} totalAmount={totalAmount} rupees={rupees} />

//       <p className="text-sm text-gray-600 max-w-2xl text-center mt-4">
//         Tip: Type a note in any row, then click <strong>Add at top</strong> or <strong>Shuffle order</strong>.
//         With <em>index keys</em>, the note may jump to another product. With <em>id keys</em>,
//         it stays with the same product. That is the real power of stable keys.
//       </p>
//     </div>
//   );
// }

// function CartTable({ items, removeItem, changeQty, useIndexKeys, rupees }) {
//   return (
//     <div className="w-full max-w-3xl">
//       <div className="grid grid-cols-12 gap-2 font-semibold border-b pb-2">
//         <div className="col-span-4">Product</div>
//         <div className="col-span-2">Price</div>
//         <div className="col-span-3">Quantity</div>
//         <div className="col-span-2">Line Total</div>
//         <div className="col-span-1 text-right">Action</div>
//       </div>

//       <ul className="divide-y">
//         {items.map((it, idx) => (
//           // Toggle between a stable id key (correct) and an index key (buggy)
//           <Row
//             key={useIndexKeys ? idx : it.id}
//             product={it}
//             idx={idx}
//             removeItem={removeItem}
//             changeQty={changeQty}
//             rupees={rupees}
//           />
//         ))}
//       </ul>
//     </div>
//   );
// }

// function Row({ product, idx, removeItem, changeQty, rupees }) {
//   // Local state here intentionally demonstrates how keys preserve per-row state.
//   const [note, setNote] = useState("");

//   return (
//     <li className="grid grid-cols-12 gap-2 py-2 items-center">
//       <div className="col-span-4 flex flex-col">
//         <span className="font-medium">{product.name}</span>
//         <input
//           className="border rounded px-2 py-1 mt-1"
//           placeholder={`Note for ${product.name}`}
//           value={note}
//           onChange={(e) => setNote(e.target.value)}
//         />
//       </div>

//       <div className="col-span-2">{rupees(product.price)}</div>

//       <div className="col-span-3 flex items-center gap-2">
//         <button className="border rounded px-2" onClick={() => changeQty(product.id, -1)}>-</button>
//         <span className="min-w-[2ch] text-center">{product.qty}</span>
//         <button className="border rounded px-2" onClick={() => changeQty(product.id, +1)}>+</button>
//       </div>

//       <div className="col-span-2 font-medium">
//         {rupees(product.qty * product.price)}
//       </div>

//       <div className="col-span-1 text-right">
//         <button className="border rounded px-2" onClick={() => removeItem(product.id)}>
//           ✕
//         </button>
//       </div>
//     </li>
//   );
// }

// function TotalsCard({ totalQty, totalAmount, rupees }) {
//   return (
//     <div className="w-full max-w-3xl mt-2 p-3 border rounded">
//       <div className="flex justify-between">
//         <div>Items (via reduce):</div>
//         <div className="font-semibold">{totalQty}</div>
//       </div>
//       <div className="flex justify-between mt-1">
//         <div>Cart Total:</div>
//         <div className="font-semibold">{rupees(totalAmount)}</div>
//       </div>
//     </div>
//   );
// }

// practice hooks

// 1 useState

// import {useState} from 'react';

// function App(){
//   const [details,setDetails]= useState({counter:0,name:""})
//   function increment(){
//     setDetails((prev)=>({
//       ...prev,
//       counter: prev.counter+1
//     }));
//   }
//   console.log(details);
//   return (
//     <div>
//       <input type="text" onChange={(e)=> e.target.value}></input>
//       <h1> 
//         {details.name} has clicked {details.counter} times!!!
//       </h1>
//       <button onclick={increment}>Increase</button>
//     </div>

//   )
// }
// export default App;


//2 useEffect change with depedency & cleanup function

// import React , { useEffect,useState } from 'react';
// function App(){ 
//   const [count, setCount] = useState(0);
//   const [othercount, setotherCount] = useState(0);

//   useEffect(()=>{
//     document.title = `${othercount} new messages !`;
//   },[othercount]);

//   useEffect(()=>{
//     console.log('Run useEffect',count);

//     return ()=>{
//       console.log('cleanup functiont ',count)
//     }
//   },[count])
//   return (
//     // <div>
//     //   <h3>{count} new Messages !</h3>
//     //   <button onClick={() => setCount(count+1)}>Increase</button>
//     //   <button onClick={() => setotherCount(othercount+5)}>AnotherIncrease</button>
//     // </div>
//     <>
//       <h3>Count {count}</h3>
//       <button onClick={() => setCount(count+1)}>Increase</button>
//     </>
//   )
// } 


// 3. creating a context  
// for creating context to globally share accrosss components
// import React, { createContext } from 'react';
// import MainComponent from "./components/MainComponent";

// export const loggincontext = createContext();

// function App() {
//   return (
//     <loggincontext.Provider value={true}>
//       <div>
//         <MainComponent />
//       </div>
//     </loggincontext.Provider>
//   );
// }

// export default App;


// 4  useref to access dom elements without documnet.getElement but reference 

// create mutable var without rerender

// why cant use useState onchnage it rerenders n falls in infinite loop  with useeffect

// import React, {useRef, useState, useEffect } from 'react';
// import FocusInput from './components/FocusInput';
//  function App(){
//   return (
//     <div style = {{fontFamily: "system-ui, sans-serif",padding:16}}>
//       <h2>useRef - DOM access & mutuable values(no rerender)</h2>
//       <FocusInput />
//       <hr/>
//     </div>
//   )
// }



// 5 useReducer used to manage complex state with initial state n dispatch
// the useReducer return state which is then considered as nextState -- no dom calls,no nw
// search about dispatch methods n stuff

// import React, {useReducer} from 'react';
// import TodoList from './components/TodoList'
// function App()
// {
//   return (
//     <div style={{fontFamily: "system-ui, sans-serif", padding:16}}>
//       <h2>useReducer - predictable state updates</h2>
//       <TodoList/>
//     </div>
//   )
// }

/// 6 useLayoutEffect -- b4 Dom printed (anything realated to layout)
// same as useEffect - after dom printed --synchronous code

// import React, { useLayoutEffect, useEffect, useRef, useState } from 'react';
// function App(){
//   const boxRef = useRef(null);
//   const [height, setHeight] = useState(0);

//   useLayoutEffect(()=>{
//     const rect = boxRef.current.getBoundingClientRect();
//     setHeight(rect.height);
//     console.log("uselayout height measured ", rect.height);
//   },[]);

//   useEffect(()=>{
//     console.log("useEffect - DOM Painteed")
//   },[]);

//   return (
//     <div style = {{ fontFamily: "system-ui",padding:16}}>
//        <h2>useLayoutEffect demo</h2>
//        <div
//         ref= {boxRef}
//         style = {{
//           background: "#aaf",
//           padding: 20,
//           margin: "16px 0",
//           height: Math.random()*200+50
//         }}
        
//        >IN BOX</div>
//        <p> measured height : <b>{height.toFixed(1)}px</b></p>
//     </div> 
//   )
// }

// 7 useMemo --  same syntax as useEffect --> run on depedency change , use to memoize expensive function avoid reclac
// differrence in useMemo n useEffect --> used for performance improvement 
// all sideeffects in useEffect hook
//  expensive function / calc useMemo hook
// returns memoized value

// import React, { useState, useMemo } from "react";

// function App() {
//   const [count, setCount] = useState(0);
//   const [dark, setDark] = useState(false);

//   //  simulate expensive calculation
//   const expensiveValue = useMemo(() => {
//     console.log("Recomputing expensive value...");
//     let result = 0;
//     for (let i = 0; i < 1e8; i++) result += i;
//     return result + count;
//   }, [count]); // only re-run when `count` changes

//   const themeStyle = {
//     backgroundColor: dark ? "#222" : "#eee",
//     color: dark ? "#eee" : "#222",
//     padding: 20,
//     borderRadius: 8,
//     marginTop: 16,
//     transition: "0.3s",
//   };

//   return (
//     <div style={{ fontFamily: "system-ui", padding: 16 }}>
//       <h2>useMemo demo — caching expensive calculations</h2>
//       <div>
//         <button onClick={() => setCount((c) => c + 1)}>Increment count</button>{" "}
//         <button onClick={() => setDark((d) => !d)}>Toggle theme</button>
//       </div>
//       <div style={themeStyle}>
//         <p>Count: {count}</p>
//         <p>Expensive value: {expensiveValue}</p>
//       </div>
//     </div>
//   );
// } 


//// 8 useCallback -- returns memoized function 
// syntax const memoizedFn = useCallback(() => { /* ... */ }, [deps]);
import React, { useState, useCallback, memo } from "react";

 function App() {
  const [count, setCount] = useState(0);
  const [dark, setDark] = useState(false);

  //  if we use inline fn, it changes every render
  // useCallback → stable function reference
  const increment = useCallback(() => {
    setCount((c) => c + 1);
  }, []); // no deps - never changes so same function reference is returned

  const themeStyle = {
    backgroundColor: dark ? "#222" : "#eee",
    color: dark ? "#eee" : "#222",
    padding: 20,
    borderRadius: 8,
    marginTop: 16,
    transition: "0.3s",
  };

  return (
    <div style={{ fontFamily: "system-ui", padding: 16 }}>
      <h2>useCallback demo — stable functions for memoized children</h2>
      <button onClick={() => setDark((d) => !d)}>Toggle Theme</button>
      <div style={themeStyle}>
        <p>Count: {count}</p>
        {/* pass function as prop */}
        <ChildButton onIncrement={increment} />
      </div>
    </div>
  );
}

// memoized child
const ChildButton = memo(function ChildButton({ onIncrement }) {
  console.log("child btn rendered");
  return (
    <button onClick={onIncrement} style={{ marginTop: 8 }}>
      Increment from child
    </button>
  );
});


//// 9 custom hooks -- own hooks reusable components 



export default App;