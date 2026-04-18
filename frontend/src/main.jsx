import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'

//main.jsx is the entry point of our React application. 
// It imports the necessary modules and renders the App component inside a StrictMode wrapper, 
// Which helps identify potential problems in the application.
//  The createRoot function from react-dom/client is used to create a root for rendering the React component tree, 
// and it targets the HTML element with the id 'root' where the app will be mounted.
//BrowserRouter is imported from react-router-dom to enable routing in the application
//  allowing for navigation between different components or pages.

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
