import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client' 
import App from './App.jsx'
import React from 'react'

const reactElement = { 
    type: 'a',
    props: {
        href: "https://www.google.com",
        target:"abcde"
    } ,
    children: "click here"
} // wont work in render due to props syntax

const workingElement = (
  <a href="https://www.google.com">Visit Google</a>
)

// create with react element
const anotherElement = React.createElement(
  'a',
  { href: 'https://www.google.com', target: '_blank' },
  'Go to Google'
)
const divElement = React.createElement(
  'div',
  {className: 'parent-div'},
  // React.createElement(
  //   'h1',
  //  "this is main heading" 
  // ), fails due to multiple children
  "In the main div"
)

createRoot(document.getElementById('root')).render(
 
  // <StrictMode>
  //   <App />
  // </StrictMode>
  //workingElement,
  //anotherElement
  divElement
) 
 