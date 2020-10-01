// Styling
// http://localhost:3000/isolated/exercise/05.js

import React from 'react'
import '../box-styles.css'

/* 

  -------------------------------------------------------------------------------------
  Core Task:
  -------------------------------------------------------------------------------------

  // 💰 Use the className for the size and style (backgroundColor) for the color
  // 💰 each of the elements should also have the "box" className applied

  // 🐨 add a className prop to each of these and apply the correct class names
  // 💰 Here are the available class names: box, box--large, box--medium, box--small

  // 🐨 add a style prop to each of them as well so their background color
  // matches what the text says it should be as well as `fontStyle: 'italic'`

  NOTE: To check everything is correct run the tests, this will check the styling for the boxes

  -------------------------------------------------------------------------------------
  Extra Credits:
  -------------------------------------------------------------------------------------
  
  - Custom Component:

  Instead of using html use JSX to create a custom component e.g. <Message text="Hello"/>

  -------------------------------------------------------------------------------------

  - Accept a size prop to encapsulate styling

  Extend the previous credit by passing in a size prop which selects the text and class name

  -------------------------------------------------------------------------------------

*/

const getBackgroundColour = size => {
  switch (size) {
    case 'small': {
      return 'lightblue'
    }

    case 'medium': {
      return 'pink'
    }

    case 'large': {
      return 'orange'
    }

    default: {
      return 'lightblue'
    }
  }
}

const Box = ({size}) => (
  <div
    className={`box box--${size}`}
    style={{fontStyle: 'italic', backgroundColor: getBackgroundColour(size)}}
  >
    {size} {getBackgroundColour(size)} box
  </div>
)

const App = () => {
  return (
    <>
      <Box size="small" />
      <Box size="medium" />
      <Box size="large" />
      <Box>Sizeless Box</Box>
    </>
  )
}

export default App
