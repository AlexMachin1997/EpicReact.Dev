// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import React, { useState } from 'react'


/* 
-------------------------------------------------------------------------------------
Core Task:
-------------------------------------------------------------------------------------

 Create a CountContext using the React.useContext hook
 
 Create a provider component using the CountContext, it must accept children and have some internal state e.g. count

 Provide the state to the provider via the value prop e.g. <CountContext.Provider value={[count, setCount]}></CountContext.Provider>

 Wrap the app component in the provider. This will allow the useContext hook to find the appropriate context we are trying to access  

-------------------------------------------------------------------------------------
 Extra Credits:
-------------------------------------------------------------------------------------

- Create a custom hook for accessing the values stored inside of the CountText

For this extra credit a custom hook will need to be create, it's purpose's will be to:

- Check to see if a context exists e.g. if(!context) throw Error()

- When a context does exist return either the destructured values or just return the context (Either way work's)

- Replace all the React.useContext(CountContext) references with the custom hook (This shouldn't require any changes) 

*/


// Creating the context with some initial state
const CountContext = React.createContext(0)

// Creating the provider (Wrapped around the components wanting to use the context)
const CounterProvider = ({children}) => {
  
  // Creating some initial state 
  const [count, setCount] = useState(0);
    
  // Make sure the component accepts children as props
  return (
    <CountContext.Provider value={[count, setCount]}>
      {children}
    </CountContext.Provider>
  )
}

// Extra Credit - Cool custom hook for accessing the CountContext
const useCounter = () => {

  // Try to access the context
  const context = React.useContext(CountContext);

  // Check the context exists
  if(!context) {
    throw Error('useCount seCounter hook');
  }

  // Return the context if found
  return context;
}

function CountDisplay() {
  // 🐨 get the count from useContext with the CountContext
  // const [count] = React.useContext(CountContext);
  const [count, ] = useCounter();
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  // 🐨 get the setCount from useContext with the CountContext
  const [,setCount] = useCounter();
  // const count = 0;
  // const setCount = () => {};
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}

function App() {
  return (
    <CounterProvider>
      <CountDisplay />
      <Counter />
    </CounterProvider>
  )
}

export default App
