
//what we have done here is we have created a new component called Homepage, 
// which is a functional component that returns a simple JSX element displaying "HomePage". 
// This component can be used as a page in our application, and we have also exported it as the default export of the module, 
// allowing it to be imported and used in other parts of the application, such as in our routing setup in App.jsx.
import React from 'react'

const Homepage = () => {
  return (
    <div>Homepage</div>
  )
}

export default Homepage