// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import React from 'react'

function UsernameForm({onSubmitUsername}) {
  /* 
  
  -------------------------------------------------------------------------------------
  Core Task:
  -------------------------------------------------------------------------------------
  
  // 🐨 add a submit event handler here (`handleSubmit`).
  // 💰 Make sure to accept the `event` as an argument and call
  // `event.preventDefault()` to prevent the default behavior of form submit
  // events (which refreshes the page).
  //
  // 🐨 get the value from the username input (using whichever method
  // you prefer from the options mentioned in the instructions)
  // 💰 For example: event.target.elements[0]
  // 🐨 Call `onSubmitUsername` with the value of the input

  // 🐨 add the onSubmit handler to the <form> below

  // 🐨 make sure to associate the label to the input by specifying an `id` on
  // the input and a matching value as an `htmlFor` prop on the label.

  -------------------------------------------------------------------------------------
  Extra Credits:
  -------------------------------------------------------------------------------------
  
  - Using useRef() hook

  Get the value via the reference object e.g. ref={usernameRef} -> usernameRef.current.value
  
  -------------------------------------------------------------------------------------

  - Validate lower-case

  Check to see if the username is lowercase or not

  When the name is not lowercase show an error message e.g. 'The username must be lower-case'.

  Notes: 

  - To store the error message use the useState hook e.g. const [error, setError] = useState('');

  - Replace App in 06.js with the final, you can't run all the tests at once 

  -------------------------------------------------------------------------------------

  - Controlled form inputs

  Instead of accessing the element by ref, id or form elements store the value in state.

  Notes: 
  
  - To update the state assign the setter to the handleUsernameChange function  

  - Now when the value is passed to the callback provide the state instead

  -------------------------------------------------------------------------------------
  */

  /* Extra Credit 1 - Storing the value in a ref object. This stores the Event object basically. */
  const usernameRef = React.useRef()

  const [username, setUsername] = React.useState('')
  const [errorMessage, setErrorMessage] = React.useState('')

  const onSubmit = event => {
    event.preventDefault()

    // Get the element by id and store the value
    // const username = document.getElementById('username').value

    // Get the element from the value form
    // const username = event.target[0].value

    // Get the element by ref
    // const username = usernameRef.current.value
    onSubmitUsername(username)
  }

  const handleUsernameChange = e => {
    // Grab the value from the event object
    const {value} = e.target

    /* Extra Credit 3 - Handling state update */
    setUsername(value.toLowerCase())

    /* Extra Credit 2 - Only allow lowercase characters */
    const isValid = value === value.toLowerCase()

    if (isValid) {
      setErrorMessage('Username must be lower case')
    } else {
      setErrorMessage('')
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          ref={usernameRef}
          value={username}
          onChange={handleUsernameChange}
        />
        {errorMessage.length !== 0 && (
          <div style={{color: 'red'}} role="alert">
            {errorMessage}
          </div>
        )}
      </div>
      <button type="submit" disabled={errorMessage.length !== 0}>
        Submit
      </button>
    </form>
  )
}

function App() {
  const onSubmitUsername = username => alert(`You entered: ${username}`)
  return <UsernameForm onSubmitUsername={onSubmitUsername} />
}

export default App
