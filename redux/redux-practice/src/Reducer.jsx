// import React from 'react'
// import {useReducer} from 'react'; 

// function counterReducer(state, action) {
//   switch (action.type) {
//     case "INCREMENT":
//       return state + 1;
//     case "DECREMENT":
//       return state - 1;
//     default:
//       return state;
//   }
// }
// function Reducer() { 
//     let [count, dispatch] = useReducer(counterReducer,0 )
     
//     return (
//     <div>
//         <div className = "p-4 h-lvh flex flex-col justify-center items-center">
//             <h1>{count}</h1>
//            <Button
//                 onClick={() => dispatch({ type: "INCREMENT" })}
//                 className="mb-2"
//             >
//             Increment 
//             </Button>

//             <Button
//                 onClick={() => dispatch({ type: "DECREMENT" })}
//             >
//             Decrement
//             </Button>
//         </div>
//         <h1>Hello from useReducer</h1>
      
//     </div>
//   )
// }

// export default Reducer
import React, { useReducer } from 'react'; 
// 1️⃣ Reducer function
function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

function Reducer() {

  // 2️⃣ useReducer hook needs (reducerFn, initialState)
  const [count, dispatch] = useReducer(counterReducer, 0);

  return (
    <div className="p-4 h-lvh flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-4">{count}</h1>

      <button
        onClick={() => dispatch({ type: "INCREMENT" })}
        className="mb-2"
      >
        Increment
      </button>

      <button
        onClick={() => dispatch({ type: "DECREMENT" })}
      >
        Decrement
      </button>
    </div>
  );
}

export default Reducer;
