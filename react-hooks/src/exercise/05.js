// useRef and useEffect: DOM interaction
// http://localhost:3000/isolated/exercise/05.js

import React, { useEffect, useRef } from 'react'
// eslint-disable-next-line no-unused-vars
import VanillaTilt from 'vanilla-tilt'

/* 

-------------------------------------------------------------------------------------
Core Task:
-------------------------------------------------------------------------------------

In this exercise we’re going to make a <Tilt /> component that renders a div and uses the vanilla-tilt library to make it super fancy.

The thing is, vanilla-tilt works directly with DOM nodes to setup event handlers and stuff, so we need access to the DOM node. But because we’re not the one calling document.createElement (React does) we need React to give it to us.

So in this exercise we’re going to use a ref so React can give us the DOM node and then we can pass that on to vanilla-tilt.

Additionally, we’ll need to clean up after ourselves if this component is unmounted. Otherwise we’ll have event handlers dangling around on DOM nodes that are no longer in the document.

-------------------------------------------------------------------------------------

*/

const Tilt = ({children}) => {

  const titleRef = useRef(); // Initial value is undefined

  // 🐨 add a `React.useEffect` callback here and use VanillaTilt to make your
  useEffect(() => {

    // Get the DOM node via the current property from the ref (FYI the ref is assigned to the parent container)
    const tiltNode = titleRef.current;

    // Create the animation for the DOM node
    VanillaTilt.init(tiltNode, {
      max: 25,
      speed: 400,
      glare: true,
      "max-glare": 0.5
    });

    // When the component is removed destroy the animation - the vanillaTilt is a property which is injected when the animation is added to the element
    return () => tiltNode.vanillaTilt.destroy();
  }, []);
  
  return (
    <div className="tilt-root" ref={titleRef}>
      <div className="tilt-child">{children}</div>
    </div>
  )
}

function App() {
  return (
    <Tilt>
      <div className="totally-centered">vanilla-tilt.js</div>
    </Tilt>
  )
}

export default App
