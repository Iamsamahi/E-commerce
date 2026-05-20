// //now that we have set up our main.jsx file to include BrowserRouter, 
// // we can proceed to define our App component in App.jsx.
// //this app.jsx contains all common behaviour for the other pages like homepage, login page and signup page.
// // we will use react-router-dom to define the routes for our application, 
// // which will allow us to navigate between different pages based on the URL path.
// //every pagew will have a navigation bar and footer, so we will include those in the App component as well,
  

import { Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginUpPage from './pages/LoginUpPage';
import SignUpPage from './pages/SignUpPage';
import NavBar from './components/NavBar';
import { Toaster } from 'react-hot-toast';
import { useUserStore } from './stores/useUserStore';
import { useEffect } from 'react';
import LoadingSpinner from './components/LoadingSpinner';


function App() {
  const { user, checkAuth, checkingAuth } = useUserStore();

  useEffect(() => {
    checkAuth();
  }, []); // run once on mount

  if (checkingAuth) return <LoadingSpinner />;

  return (
    <div className='min-h-screen bg-gray-800 text-white relative overflow-hidden'>
      

      {/* Background effect */}
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute inset-0'>
          <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full 
          bg-[radial-gradient(ellipse_at_top,rgba(16,185,129,0.3)_0%,rgba(10,80,60,0.2)_45%,rgba(0,0,0,0.1)_100%)]' />
        </div>
      </div>

      {/* Main content */}
      <div className='relative z-50 pt-20'>
        <NavBar />

        <Routes>
          <Route path="/" element={<HomePage />} />

          <Route
            path="/signup"
            element={!user ? <SignUpPage /> : <Navigate to="/" />}
          />

          <Route
            path="/login"
            element={!user ? <LoginUpPage /> : <Navigate to="/" />}
          />

          <Route
            path="/secret-dashboard"
            element = {user?.role === 'admin' ?<AdminPage/> : <Navigate to="/login" />}
          />
        </Routes>
      </div>

      <Toaster />
    </div>
  );
}

export default App;