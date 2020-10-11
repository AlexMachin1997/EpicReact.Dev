// useState: greeting
// http://localhost:3000/isolated/exercise/01.js

import React, {useState} from 'react'

/* 
  -------------------------------------------------------------------------------------
  Core Task:
  -------------------------------------------------------------------------------------

  In this exercise we have a form where you can type in your name and it will give
  you a greeting as you type. Fill out the `Greeting` component so that it manages
  the state of the name and shows the greeting as the name is changed.
  
  -------------------------------------------------------------------------------------
  Extra Credits:
  -------------------------------------------------------------------------------------

  - initialName prop

  Provide a custom initialName prop, this will allow a custom name to be passed in when the
  component renders initially.

  -------------------------------------------------------------------------------------
*/

const Greeting = ({initialName}) => {

  const [name, setName] = useState(initialName ?? '');
 
  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input onChange={(e) => setName(e.target.value)} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting initialName="Alex Machin" />
}

export default App
