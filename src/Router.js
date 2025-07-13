// src/router.js

import React from 'react';
import { createBrowserRouter, RouterProvider, redirect, Navigate } from 'react-router-dom'; // Import `redirect`
import Login from './components/Login';
import SignUp from './components/SignUp';
import Chatbot from './components/Chatbot';
import ResetPassword from './components/ResetPassword';
import ForgotPassword from './components/ForgotPassword';
import Subscription from './components/subscriptionScreen'; // Import Subscription component
import Terms from './components/terms'; // Import Terms component
import { account } from './appwriteConfig'; // Ensure Appwrite configuration is correct

// Loader function for authenticated routes
const loader = async () => {
  try {
    await account.get(); // Check if the user is logged in
    return {}; // User is authenticated, proceed to the route
  } catch {
    throw redirect('/login'); // Redirect to login if not authenticated
  }
};

// Define routes
const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />, // Ensure this route is correctly set
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />, // Ensure this route is correctly set
  },
  {
    path: "/subscription",
    element: <Subscription />, // Add a route for subscription page
  },
  {
    path: "/terms", // Add this line for the terms page
    element: <Terms />, // Ensure you have a Terms component
  },
  {
    path: "/chatbot",
    element: <Chatbot />,
    loader, // Use loader to protect this route
  },
  {
    path: "*",
    element: <Navigate to="/login" replace />, // Redirect unknown paths to login
  },
]);

const AppRouter = () => (
  <RouterProvider router={router} />
);

export default AppRouter;
