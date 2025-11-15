// // useReducer hook 

// // import { useState } from 'react' 
// // import './App.css'
// // import Reducer from './Reducer';

// // function App() {
// //   const [count, setCount] = useState(0)

// //   return (
// //     <>
// //       <Reducer/> 
// //     </>
// //   )
// // }

// // export default App
// import React from "react";
// import Reducer from "./Reducer";

// function App() {
//   return (
//     <>
//       <Reducer />
//     </>
//   );
// }

// export default App;




// redux counter app 
import { useSelector, useDispatch } from "react-redux";
// if App.jsx is directly inside src/
import { increment, decrement, reset } from "./app/features/counter/counterSlice";



function App() {
  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Redux Counter</h1>

      <h2>{count}</h2>

      <button onClick={() => dispatch(increment())}>Increment</button>
      <br /><br />
      <button onClick={() => dispatch(decrement())}>Decrement</button>
      <br /><br />
      <button onClick={() => dispatch(reset())}>Reset</button>
    </div>
  );
}

export default App;
