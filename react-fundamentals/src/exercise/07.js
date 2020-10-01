// Rendering Lists
// http://localhost:3000/isolated/exercise/07.js

import React from 'react'

/* 

  -------------------------------------------------------------------------------------
  Core task:
  -------------------------------------------------------------------------------------
  In this exercise, we have a list of fruit that appear and can be removed. There
  is state that exists (managed by the browser) in the `<input />` for each of the
  fruit. Without a key, React has no way of knowing which React element you return
  the second time corresponds to the specific DOM nodes it removes, so it does
  it's best. For all React knows, you removed an input and gave another label
  different text content, which leads to the bug we'll see in the exercise.

  If you remove them from bottom to top then things work fine, but if you remove
  them in any other order you'll notice that the wrong inputs are getting removed.

  This one is more of a demo than an exercise because the actual solution is
  pretty simple. Just do what the emoji says :)

  -------------------------------------------------------------------------------------
  Solution:
  -------------------------------------------------------------------------------------

  When React renders an array it needs a way to track the JSX elements, this can be accomplished through the use of the "key" property

  The "key" must be unique, so when iterating use .map() use an object property and NOT the built in key as that what is used by default.
  This makes it unreliable. Without the key property React will do it's best to guess what happened to the item, but it's not always correct or accurate as it's "guessing". 
  To overcome this issue a key property can be used, React will use this to track item. 

  Example of where the key prop is an issue:

  A good example of this is if you focus on an element and it changes position, without a key React  will keep focus on
  the current element even though it might have changed position in the array e.g. deleting an item.

  -------------------------------------------------------------------------------------

*/

const allItems = [
  {id: 'a', value: 'apple'},
  {id: 'o', value: 'orange'},
  {id: 'g', value: 'grape'},
  {id: 'p', value: 'pear'},
]

const App = () => {
  const [items, setItems] = React.useState(allItems)

  function addItem() {
    setItems([...items, allItems.find(i => !items.includes(i))])
  }

  function removeItem(item) {
    setItems(items.filter(i => i !== item))
  }

  return (
    <div
      style={{
        height: 200,
        width: 400,
        backgroundColor: '#eee',
        borderRadius: 4,
        padding: 20,
      }}
    >
      <button disabled={items.length >= allItems.length} onClick={addItem}>
        add item
      </button>
      <ul style={{listStyle: 'none', paddingLeft: 0}}>
        {items.map(item => (
          // 🐨 add a key prop to the <li> below. Set it to item.id
          <li key={item.id}>
            <button onClick={() => removeItem(item)}>remove</button>{' '}
            <label htmlFor={`${item.value}-input`}>{item.value}</label>{' '}
            <input id={`${item.value}-input`} defaultValue={item.value} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
