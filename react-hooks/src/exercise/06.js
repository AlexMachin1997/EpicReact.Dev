// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import React, { useEffect, useState } from 'react';
import {ErrorBoundary} from 'react-error-boundary'
import {fetchPokemon, PokemonDataView, PokemonForm, PokemonInfoFallback} from '../pokemon'
/* 
-------------------------------------------------------------------------------------
Core Task:
-------------------------------------------------------------------------------------

In this exercise, we'll be doing data fetching directly in a useEffect hook
callback within our component.
Here we have a form where users can enter the name of a pokemon and fetch data
about that pokemon. Your job will be to create a component which makes that
fetch request. When the user submits a pokemon name, our `PokemonInfo` component
will get re-rendered with the `pokemonName`

-------------------------------------------------------------------------------------
Extra Credits:
-------------------------------------------------------------------------------------

- Handling errors

Sometimes requests will fail for various reasons, for example not finding a pokemon or not connecting to an API
To let the user know the application was unable to find some pokemon's an error will need to be shown, store this message in state

-------------------------------------------------------------------------------------

- Network status

The error handling is messy and very difficult to follow, to make it easier to follow some additional state will need to be created to
store the network status.

Examples of status:
idle: no request made yet
pending: request started
resolved: request successful
rejected: request failed

NOTE: Don't use an if, else if, else approach. Use a switch as it's based on one condition (status)

-------------------------------------------------------------------------------------

- Storing object in state (IMPORTANT)

Currently each piece of state is stored individually ie multiple [] = useState() are declared.
Currently this isn't an issue, but if for some reason the state needed to be set in a different order then this would become an issue.
If the status was set to resolved and the pokemon data wasn't set then the component would throw an error e.g. image property not found.

Example:

Was:
const [pokemon, setPokemon] = useState(null);
const [status, setStatus] = useState('idle');
const [error, setError] = useState(null);

Now:
const [state, setState] = useState({
  pokemon: null,
  status: 'idle',
  error: null
})

NOTE: 

When the state is set all the previous properties won't be available. We could use the spread operator and
create a custom component, but it's not needed. Plus later on we will use the useReducer hook which handles this type of state ie object based

-------------------------------------------------------------------------------------

- Custom Error Boundary and re-mounting the Error Boundary component

We already handle API related, however, we don't have a way to handle UI related. To prevent "the white screen of death"
create a custom ErrorBoundary component.

The component will need to be able to do the following:

- Wrap around the PokemonInfo, it will be the components children e.g. <ErrorBoundary><h1>Hello</h1><ErrorBoundary/>

- Accept a custom component to present an error message (Pass in the component and return it like <this.props.FallbackComponent error={this.state.error}/>)

- Pass in a key to the ErrorBoundary, this will allow the component to re-mount when the value for the key changes e.g. pokemonName getting updated


NOTES: 

- To trigger the component you need to use the "throw" keyword, this will throw a UI error rendering the ErrorBoundary

- Heres a link to the ErrorBoundary section of the React docs -> https://reactjs.org/docs/error-boundaries.html


-------------------------------------------------------------------------------------

Using "use react-error-boundary" to handle the ErrorBoundary

- Replace the current ErrorBoundary component with an external component

- Pass the custom error component to the FallbackComponent prop for ErrorBoundary

- Use the resetKeys prop to enable users to select a pokemon and reset the error boundary (You need to pass the state in e.g. [pokemonName])

Note: Heres the link to the library -> https://github.com/bvaughn/react-error-boundary

*/

// class ErrorBoundary extends Component {

// Custom ErrorBoundary component, equivalent of "use react-error-boundary"

//   // Stores the error state
//   constructor(props) {
//     super(props);
//     this.state = {
//       error: null
//     }
//   }

//   // Gets the error which was thrown whilst rendering the UI 
//   static getDerivedStateFromError(error) {
//     return {error: error}
//   }
  
//   render() {

//     const {error} = this.state;

//     // When there is an error return the fallback component which was passed in
//     if(error) {
//       return <this.props.FallbackComponent error={this.state.error}/>
//     }

//     // When there are no errors return whatever children are passed in between the ErrorBoundary e.g. the pokemon card
//     return this.props.children;
//   }
// }

const usePokemon = (pokemonName) => {

  const initialState = {
    pokemon: null,
    error: null,
    status: pokemonName ? 'pending' : 'idle'
  }

  // The state is stored inside of one object, this prevents multiple re-renders from occurring and the setting of the state doesn't matter now.
  // NOTE: When the state is set the existing properties will be removed, we could spread them but there is no need in this case. Plus there is a better option later on, useReducer hook
  const [state, setState] = useState(initialState);

  // Destructuring the state into individual 
  const {pokemon, error, status} = state;

  // Get the pokemon via the name e.g. charizard
  useEffect(() => {

    // When there is no pokemonName exit early
    if(!pokemonName) return;

    /* 
    
    useEffect note:
    
    - useEffect can't be asynchronous because the useEffect hook returns a cleanup function and not a promise

    - To overcome the async problem a custom async hook can be created and then called below (We don't need to await the function in this case)
    
    Resources:
    
    - https://medium.com/javascript-in-plain-english/how-to-use-async-function-in-react-hook-useeffect-typescript-js-6204a788a435

    */
    const getAPokemon = async () => {
      
      // Set the initial state ie put the app into a loading state
      setState({pokemon: null, status: 'pending'})
   
      try {

        // Wait for the fetchPokemon method to resolve, this has been extracted on purpose
        const res = await fetchPokemon(pokemonName);
          
        // Update the pokemon and status state
        setState({pokemon: res, status: 'resolved'});
      } catch(err) {
                
        // Whenever an error occurs set the status to rejected
        setState({pokemon: null, status: 'rejected', error: err});
      }      
    }

    // Call the inline function (No need to await it in this case)
    getAPokemon();

  }, [pokemonName])

  // Return the values - The order matters when destructuring the values whilst using the function
  return [pokemon, error, status];
}

const PokemonInfo = pokemonName => {


  // Must be destructured in the same as the values are returned, they aren't 
  const [pokemon, error, status] = usePokemon(pokemonName);

  // Render the content based on the status of the request
  switch(status) {

    // Renders the idle ui ie just text prompting you to search :D
    case 'idle': {
      return 'Submit a Pokemon Name';
    }

    // Renders the loading ui component
    case 'pending': {
      return <PokemonInfoFallback name={pokemonName}/>
    }

    // Renders the main ui component, PokemonDataView
    case 'resolved': {
      return <PokemonDataView pokemon={pokemon}/>
    }

    // Renders the ErrorBoundary
    case 'rejected': {
      throw error.message
    }

    // Renders the ErrorBoundary
    default: {
      // eslint-disable-next-line no-throw-literal
      throw "Something went wrong!"
    }
  }
}

// The resetErrorBoundary is injected via the FallBackComponent prop for ErrorBoundary
const ErrorFallback = ({error, resetErrorBoundary}) => {
  return (
    <div role="alert">
      There was an error: <pre style={{whiteSpace: 'normal'}}>{error}</pre>
      <button onClick={resetErrorBoundary}>Try again!</button>
    </div>
  )
}

const App = () => {

  // Stores the search value
  const [pokemonName, setPokemonName] = React.useState('')

  // Used to handle the form submission
  const handleSubmit = newPokemonName => setPokemonName(newPokemonName)

  // Used to reset the pokemon name ie when the user had an error and they set the pokemon name
  const handleReset = () => setPokemonName('');

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr /> 
      <div className="pokemon-info">
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={handleReset} resetKeys={[pokemonName]}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>    
    </div>
  )
}

export default App