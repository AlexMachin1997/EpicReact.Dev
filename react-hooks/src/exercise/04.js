// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import React from 'react'

import {useLocalStorageState} from '../utils';

// Generates an array with null values, these slowly get replaced with X's or O's
const initialSquares = Array(9).fill(null);

// Board component - Handles the board interactions ie click events for the squares, generating the 3x3 grid
const Board = ({squares, onClick}) => {

  // Generates a single square
  const renderSquare = i => (
      <button className="square" onClick={() => onClick(i)}>
        {squares[i]}
      </button>
    );

  return (
    <div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

function calculateNextValue(squares) {

  // Get the length of all the squares which have a value of X 
  const xSquaresCount = squares.filter(r => r === 'X').length

  // Get the length of all the squares which have O
  const oSquaresCount = squares.filter(r => r === 'O').length

  // Switch between X and O's. Each time an item is added to the array the item will be flipped. 
  // 0 === 0 -> true (X) , 0 === 1 -> false (O), 1 === 1 -> true (X)
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  // Loop through the lines array
  for (let i = 0; i < lines.length; i++) {

    // Destructuring the elements from the array e.g. [0, 1, 2] becomes individual variables e.g. a, b, c
    const [a, b, c] = lines[i]

    // Checks to see if the current element has three in a row 
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }

  return null
}

const Game = () => {

  // Gets set when you either select a square, select a record from the history or if you reset the game.
  const [currentStep, setCurrentStep] = useLocalStorageState('tic-tac-toe:step', 0);

   // Gets set when you either select a square, select a record from the history or if you reset the game.
   // This stores a multi-dimensional array e.g. [[null, null, null, null, null, null, null, null, null], [null, null, null, null, null, null, null, null, "X"]]
  const [history, setHistory] = useLocalStorageState('tic-tac-toe:history', [initialSquares]);

  // Accesses an element of the history via the currentStep e.g. step 1 returns the second move you made
  const currentSquares = history[currentStep];
  
  // Calculate the next value e.g. X or O
  const nextValue  = calculateNextValue(currentSquares);

  // Calculate the winner (Not too sure how this works exactly)
  const winner = calculateWinner(currentSquares);

  // Calculate the games status (Returns the next player or the winner of the game)
  const status = calculateStatus(winner, currentSquares, nextValue);


  function selectSquare(index) {

    // winner === true || Square index is already taken then don't allow allow the current square to be updated (Square taken -> true, else false)
    if(winner ||  currentSquares[index]) return;

    // Take a copy of the history array
    const newHistory = history.slice(0, currentStep + 1);

    // Copy the state, it can't or at least shouldn't be modified directly. So copy it then reset the state
    const squaresCopy = [...currentSquares];

    // Update the selected square with the next value e.g. X or O
    squaresCopy[index] = nextValue;

    // Spread the new history (Array with modified element) and add the existing array elements to the history (Don't delete the old history)
    setHistory([...newHistory, squaresCopy])
    
    // The current step is the number of elements inside of the newHistory e.g. second click is step 2 for example
    setCurrentStep(newHistory.length)
  }

  // Generates a list for each history item
  const moves = history.map((_, index) => {
  
    // When the index is 0 show "Go to game start", else "Go to move #{index}"
    const desc = index === 0 ? 'Go to game start' : `Go to move #${index}`;
    
    // If the index is the same as the current step then it's the current Index
    // This disabled the button and appends "(Current)" to the description
    const isCurrentStep = index === currentStep;

    // Add the UL to the moves array e.g. <li> Go to move #2 (Current) </li>
    // Disable the UI if it's the current move e.g. you selected move 5 you shouldn't be able to click it again.
    return (
      <li key={index}>
        <button disabled={isCurrentStep} onClick={() => setCurrentStep(index)}>
          {desc} {isCurrentStep ? '(Current)' : null}
        </button>
      </li>
    )
  });

  return (
    <div className="game">
      <div className="game-board">
        <Board onClick={selectSquare} squares={currentSquares} />
        <button className="restart" onClick={() => {
          setHistory([initialSquares]);
          setCurrentStep(0);
        }}>
          restart
        </button>
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

const App = () => <Game/>

export default App


/* 

The version which works with 04-extra-1.js

// useState: tic tac toe
// http://localhost:3000/isolated/exercise/04.js

import React from 'react'

import {useLocalStorageState} from '../utils';

const initialSquares = Array(9).fill(null);

const Board = () => {

  // The squares need to be reactive, so they are stored in state
  // const [squares, setSquares] = useState(() => JSON.parse(window.localStorage.getItem('squares')) || initialSquares);

  // useEffect(() => {
  //   window.localStorage.setItem('squares',JSON.stringify(squares));
  // }, [squares]);

  const [squares, setSquares] = useLocalStorageState('squares', initialSquares);

  // Calculate the next value e.g. X or O
  const nextValue  = calculateNextValue(squares);

  // Calculate the winner,  
  const winner = calculateWinner(squares);

  // Calculate the games status (Returns the next player or the winner of the game)
  const status = calculateStatus(winner, squares, nextValue);

  function selectSquare(square) {

    // When there is either a winner or if the square already exists don't do anything
    // winner === true || Square index is already taken then don't allow allow the current square to be updated (Square taken -> true, else false)
    if(winner || squares[square]) return;

    // Copy the state, it can't or at least shouldn't be modified directly. So copy it then reset the state
    const squaresCopy = [...squares];

    // Update the selected square with the next value e.g. X or O
    squaresCopy[square] = nextValue;

    // Update the squares (Will have the updated value e.g. X or O)
    setSquares(squaresCopy);
  }

  // Whenever the "Restart" button is clicked reset the squares board back to it's initial values 
  const restart = () => setSquares(initialSquares);

  const renderSquare = i => (
      <button className="square" onClick={() => selectSquare(i)}>
        {squares[i]}
      </button>
    );

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
      <button className="restart" onClick={restart}>
        restart
      </button>
    </div>
  )
}

function calculateStatus(winner, squares, nextValue) {
  return winner
    ? `Winner: ${winner}`
    : squares.every(Boolean)
    ? `Scratch: Cat's game`
    : `Next player: ${nextValue}`
}

function calculateNextValue(squares) {
  // Get the length of all the squares which have a value of X 
  const xSquaresCount = squares.filter(r => r === 'X').length

  // Get the length of all the squares which have O
  const oSquaresCount = squares.filter(r => r === 'O').length

  // Switch between X and O's. 
  // 0 === 0 -> true (X) , 0 === 1 -> false (O), 1 === 1 -> true (X)
  return oSquaresCount === xSquaresCount ? 'X' : 'O'
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ]

  // Loop through the lines array
  for (let i = 0; i < lines.length; i++) {

    // Destructuring the elements from the array e.g. [0, 1, 2] becomes individual variables e.g. a, b, c
    const [a, b, c] = lines[i]

    // Checks to see if the current element has three in a row 
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]
    }
  }

  return null
}

const Game = () => (
  <div className="game">
    <div className="game-board">
      <Board />
    </div>
  </div>
);


const App = () => <Game/>

export default App

*/