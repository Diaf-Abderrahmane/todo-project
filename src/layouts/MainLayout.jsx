import React from 'react'
import { Outlet, useLocation } from 'react-router-dom'  // Import useLocation hook
import Navbar from '../components/Navbar'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const MainLayout = () => {
  const location = useLocation(); // Get the current route location

  // Check if the current route is the SignIn page (you can update the path as necessary)
  const isSignInPage = location.pathname === '/';

  return (
    <>
      {/* Render Navbar only if not on the SignIn page */}
      {!isSignInPage && <Navbar />}
      
      <Outlet /> {/* Render the child components based on the current route */}
      <ToastContainer />
    </>
  )
}

export default MainLayout;
