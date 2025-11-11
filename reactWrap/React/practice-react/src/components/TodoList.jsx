
// useReducer hook demo

// dispatch(action)
//    ↓
// React calls reducer(previousState, action)
//    ↓
// returns newState
//    ↓
// React compares newState vs previousState
//    ↓
// Re-renders UI using newState

import { useReducer } from "react";
const TODOS = {
    ADD:"ADD",
    TOGGLE:"TOGGLE",
    REMOVE:"REMOVE", 
    CLEAR_DONE:"CLEAR_DONE"
}

function todosReducer(state,action){
    switch(action.type){
        case TODOS.ADD: {
            const text = action.payload.trim();
            if (!text) return state;
            const newItem = {id: crypto.randomUUID(), text, done:false};
            return [newItem, ...state];
        }
        case TODOS.TOGGLE:
            return state.map((t)=>
                t.id === action.payload ? {...t, done: !t.done}: t
            );

        case TODOS.REMOVE:
            return state.filter((t)=>t.id!== action.payload)

        case TODOS.CLEAR_DONE:
            return state.filter((t)=>!t.done);
        default:
            return state;
    }
}

function TodoList(){
    const [todos, dispatch] = useReducer(todosReducer, []);
  const handleAdd = (e) => {
    e.preventDefault();
    const form = e.currentTarget;
    const text = form.elements.itemText.value;
    dispatch({ type: TODOS.ADD, payload: text });
    form.reset();
  };

  return (
    <div>
      <h3>Todos (add / toggle / remove)</h3>
      <form onSubmit={handleAdd}>
        <input name="itemText" placeholder="Add todo..." style={{ padding: 8 }} />
        <button type="submit">Add</button>{" "}
        <button type="button" onClick={() => dispatch({ type: TODOS.CLEAR_DONE })}>
          Clear done
        </button>
      </form>
      <ul style={{ paddingLeft: 18 }}>
        {todos.map((t) => (
          <li key={t.id} style={{ marginTop: 6 }}>
            <label style={{ textDecoration: t.done ? "line-through" : "none" }}>
              <input
                type="checkbox"
                checked={t.done}
                onChange={() => dispatch({ type: TODOS.TOGGLE, payload: t.id })}
              />{" "}
              {t.text}
            </label>{" "}
            <button onClick={() => dispatch({ type: TODOS.REMOVE, payload: t.id })}>
              remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
    
}

export default TodoList;