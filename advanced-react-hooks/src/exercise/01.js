// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import React, { useCallback } from 'react'

/* 

-------------------------------------------------------------------------------------
Core Task:
-------------------------------------------------------------------------------------
We're going to start off as simple as possible with a `<Counter />` component.
`useReducer` is absolutely overkill for a counter component like ours, but for
now, just focus on making things work with `useReducer`.

Replace the existing useState example with useReducer hook 

-------------------------------------------------------------------------------------
Extra Credits
-------------------------------------------------------------------------------------

- Using useReducer arguments

Pass an argument to the setter of the useReducer api, this will allow you then to increase the count by X

-------------------------------------------------------------------------------------

- Simulating setState with an object 

Instead of the state being a number create an object and update the properties of the object

NOTE: The state is will now be an object, so it will need to be accessed via the object property

-------------------------------------------------------------------------------------

- Traditional dispatch object with a type and a switch statement (REDUX APPROACH)

The setter for the reducer statement will now need to be an object with a type and a value

Create a switch statement which accepts decides the case based on the type provided e.g. INCREMENT

-------------------------------------------------------------------------------------

*/

function Counter({initialCount = 0, step = 10}) {

  /* 
  
  state -> Existing state from the useReducer hook e.g. {count: 0}

  action -> An object which accept a number of properties e.g. {type: 'INCREMENT', value: 10}
    
  */
  const countReducer = (state, action) => {

    switch(action.type) {
      case 'INCREMENT': {
        return {
          ...state,
          count: state.count + action.value
        }
      }

      case 'DECREMENT': {

        if(state.count === 0) return state;

        return {
          ...state,
          count: state.count - action.value
        }
      }

      default: {
        return state;
      }
    }
  }

  const [state, dispatch] = React.useReducer(countReducer, {
    count: initialCount
  })

  const {count} = state;


  const increment = useCallback(() => dispatch({type: 'INCREMENT', value: step}), [step]);

  const decrement = useCallback(() => dispatch({type: 'DECREMENT', value: step}), [step]);

  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
