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
