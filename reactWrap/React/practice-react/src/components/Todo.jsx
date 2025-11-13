import React from 'react'
import HOC from './HOC';

function Todo({data}) {
 let renderTodos = data.slice(0,10).map((todo)=>{
        return (
            <div key={todo.userId}>
                <p>
                    <strong>{todo.title}</strong>
                </p>
            </div>
        );
 });

  return (
    <div>
        <h2>Todos</h2>
        <input
        type= "text" 
        value={term}
        onChange={(e)=>setTerm(e.target.value)}/>
        <div>{renderTodos}</div>
 
    </div>
  )
}
const SearchTodos = HOC(Todo,"todos");
export default SearchTodos;
