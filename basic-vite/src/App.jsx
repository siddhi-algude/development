import { useState } from 'react'  
import  Demo  from './demo.jsx'
function App() {
  const [count, setCount] = useState(0)
 
  return (
    <>
    <Demo/>  
    <div> 
      Hey this is my first react app | Siddhi Algude <br/>
      <button>WElCOME</button>
    </div>
    </>
  ) 
}

export default App
 