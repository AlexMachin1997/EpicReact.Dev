// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import React, {useState, useEffect, useRef} from 'react'

/* 

  -------------------------------------------------------------------------------------
  Core Task:
  -------------------------------------------------------------------------------------

  In this exercise, we're going to enhance our `<Greeting />` component to get
  its initial state value from localStorage (if available) and keep localStorage
  updated as the `name` is updated.

  NOTE: Leverage the useEffect hook in order to retrieve the value 

  -------------------------------------------------------------------------------------
  Extra Credits:
  -------------------------------------------------------------------------------------

  Lazy Initialization:

  When the component initially runs set the state equal to the state from localStorage.

  NOTE: This will only run once, when the component renders initially

  example:

  const [value, setValue]setState(() => getMyValue());

  -------------------------------------------------------------------------------------

  Effect Dependencies:

  When the name value changes synchronize the local state with the value in local storage.

  To achieve this leverage the useEffect dependencies e.g. useEffect(() => {}, [name]);


  Custom Hook and Flexible LocalStorage hook:

  - Get the value from local storage

  - Set the state to the value from storage by returning the value (Remember to JSON.parse() the value from storage)

  - When the "defaultValue" is a function execute the function, else return the defaultValue

  - When the key changes remove the item from storage (Use the useRef hook to keep track of the key)

  NOTES:

  I didn't do this part on my own, this part was pretty trick. 

  The idea is conceptually easy but creating the hook wasn't so easy. For example, the checking
  the pervious key with the useRef hook.

  -------------------------------------------------------------------------------------
*/


// Extra Credit Task 
const useLocalStorage = (key, defaultValue = '') => {

  // Lazily load the state from localStorage or return the default value (String, Function, Number etc)
  const [state, setState] = useState(() => {

    // Get the value from localStorage
    const valueFromStorage = window.localStorage.getItem(key);

    // Check to see if the value exists in local storage already
    if(valueFromStorage) {
      try {
        // Parse the response (The value from storage might not always be a string, it could be a number, object etc)
        return JSON.parse(valueFromStorage)
      } catch(err) {
        window.localStorage.removeItem(key)
      }
    }

    // When a function is passed into the hook execute that e.g. calculateAge() else return the defaultValue
    return typeof defaultValue === 'function' ? defaultValue() : defaultValue;
  })


  // Keep track of the previous key
  const prevKeyRef = useRef(key);

  // When the state or key changes update the value in storage
  useEffect(() => {

    // Get the previous key
    const prevKey = prevKeyRef.current;

    // Compare the key's, when they don't match remove the item from storage (The key could change between renders according to Kent's workshop)
    if(prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }

    prevKeyRef.current = key;

    // Put the value into storage
    window.localStorage.setItem(key, JSON.stringify(state));
  }, [state, key]);

  // Return the value and the value setter, this is required for the input field used below
  return [state, setState];
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorage('name', initialName);

  // const [name, setName] = useState(() => window.localStorage.getItem('name') || initialName)

  // useEffect(() => {
  //   window.localStorage.setItem('name', name);
  // }, [name]);
  
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={(event) => setName(event.target.value)} id="name" value={name}/>
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Alex Machin"/>
}

export default App
