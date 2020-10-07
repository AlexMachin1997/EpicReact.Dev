// Lifting state
// http://localhost:3000/isolated/exercise/03.js

import React from 'react'

/* 

-------------------------------------------------------------------------------------
Core Task:
-------------------------------------------------------------------------------------

👨‍💼 Peter told us we've got a new feature request for the `Display` component. He
wants us to display the `animal` the user selects. But that state is managed in
a "sibling" component, so we have to move that management to the least common
parent (`App`) and then pass it down.

-------------------------------------------------------------------------------------
Extra Credits:
-------------------------------------------------------------------------------------

- Colocate the state for <Name/>

As the state is only needed in the <Name/> remove the props and move the state to this component.

NOTES: 

- Typically component state should be kept as close to the component as possible e.g. 
if the <Name/> only needs the state it should only be in the <Name/> component and not anywhere else.

- Although in this example it's pretty straight forward, often in real-world projects it's often more difficult to get this right as state might be needed in multiple places.
Often state is closed to the parent as possible, which might be quite high up depending on where the data is needed.

-------------------------------------------------------------------------------------
*/

function Name({name, onNameChange}) {

  // const [name, setName] = React.useState('');


  return (
    <div>
      <label htmlFor="name">Name: </label>
      <input id="name" value={name} onChange={onNameChange} />
      {/* <input id="name" value={name} onChange={event => setName(event.target.value)} /> */}
    </div>
  )
}

// 🐨 accept `animal` and `onAnimalChange` props to this component
function FavoriteAnimal({animal, onAnimalChange}) {
  // 💣 delete this, it's now managed by the App
  // const [animal, setAnimal] = React.useState('')
  return (
    <div>
      <label htmlFor="animal">Favorite Animal: </label>
      <input
        id="animal"
        value={animal}
        onChange={onAnimalChange}
      />
    </div>
  )
}

// 🐨 uncomment this
function Display({name, animal}) {
  return <div>{`Hey ${name}, your favorite animal is: ${animal}!`}</div>
}

// 
// function Display({name}) {
//   return <div>{`Hey ${name}, you are great!`}</div>
// }

function App() {
  // 🐨 add a useState for the animal
  const [name, setName] = React.useState(''); // - This would be commented out if the state was handled just in <Name/>
  const [animal, setAnimal] = React.useState('')

  return (
    <form>
      <Name name={name} onNameChange={event => setName(event.target.value)} /> {/* The name and onChange props would need removing if the state was managed in the component itself */}

      {/* 🐨 pass the animal and onAnimalChange prop here (similar to the Name component above) */}
      <FavoriteAnimal animal={animal} onAnimalChange={event => setAnimal(event.target.value)}/>

      {/* 🐨 pass the animal prop here */}
      <Display name={name} animal={animal} /> {/* Name wouldn't be accessible if the Name component contained the state internally, it would need removing*/}
    </form>
  )
}

export default App
