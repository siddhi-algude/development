import { useState } from 'react' 
import './App.css'

function App() {
  const [count, setCount] = useState(5)
 // let counter =0;
  const addValue = () =>{ 
    // counter++;
    setCount(count + 1);
    setCount(count+1);
    setCount(count+1)
    console.log("add value",count);
  }
  const removeValue = () =>{
    if(count==0)return;
    setCount(count-1);
  }
  return ( 
    <>
      <div>
       Counter App 
       <h1>Counter with button value : 5${count}</h1>
       <br/>
       <button onClick={addValue} >add value ${count}</button>
       <br/>
       <button onClick={removeValue}>remove value ${count}</button>
      </div> 
    </>
  )
}

export default App
