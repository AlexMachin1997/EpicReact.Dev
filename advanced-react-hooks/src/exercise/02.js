// useCallback: custom hooks
// http://localhost:3000/isolated/exercise/02.js

import React from 'react'
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from '../pokemon'

// 🐨 this is going to be our generic asyncReducer
function asyncReducer(state, action) {
  switch (action.type) {
    case 'pending': {
      return {
        ...state,
        status: 'pending',
      }
    }
    case 'resolved': {
      return {
        ...state,
        status: 'resolved',
        data: action.data
      }
    }
    case 'rejected': {
      return {
        ...state,
        status: 'rejected',
        error: action.error
      }
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
    
  }
}

function useAsync(initialState) {
  const [state, unsafeDispatch] = React.useReducer(asyncReducer, {
    ...initialState,
    status: 'idle',
    data: null,
    error: null,
  })

  const mounted = React.useRef(false);


  React.useEffect(() => {
    mounted.current = true;

    return () => {
      mounted.current = false;
    }
  }, [])

  const dispatch = React.useCallback((...args) => {
    if(mounted.current) unsafeDispatch(...args);
  }, [])

  const run = React.useCallback(promise => {
    
    dispatch({type: 'pending'})

    promise.then(
      data => {
        dispatch({type: 'resolved', data})
      },
      error => {
        dispatch({type: 'rejected', error})
      },
    )
    
  }, [dispatch])

  return {
    ...state,
    run
  };


}

function PokemonInfo({pokemonName}) {

  const {data, status, error, run} = useAsync({
    status: pokemonName ? 'pending' : 'idle',
  })

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    return run(fetchPokemon(pokemonName))
  }, [pokemonName, run])

  switch(status) {
    case 'idle': {
      return 'Submit a pokemon';
    }

    case 'pending': {
      return <PokemonInfoFallback name={pokemonName}/>
    }

    case 'rejected': {
      throw error
    }

    case 'resolved': {
      return (
        <PokemonDataView pokemon={data}/>
      )
    }

    default: {
      throw new Error('This should be impossible')
    }
  }}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonErrorBoundary onReset={handleReset} resetKeys={[pokemonName]}>
          <PokemonInfo pokemonName={pokemonName} />
        </PokemonErrorBoundary>
      </div>
    </div>
  )
}

export default App
