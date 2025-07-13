import React from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import { account } from './appwriteConfig'; // Ensure Appwrite config is correct
import Chatbot from './components/Chatbot';
import ForgotPassword from './components/ForgotPassword';
import Login from './components/Login';
import ResetPassword from './components/ResetPassword';
import SignUp from './components/SignUp';

const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <SignUp />,
    loader: async () => {
      try {
        await account.get(); // Already logged in? Redirect
        return { redirect: '/chatbot' };
      } catch {
        return {}; // Not logged in, proceed to signup
      }
    },
  },
  {
    path: "/forgot-password",
    element: <ForgotPassword />,
  },
  {
    path: "/reset-password/:token",
    element: <ResetPassword />,
  },
  {
    path: "/chatbot",
    element: <Chatbot />,
    loader: async () => {
      try {
        await account.get(); // Check login
        return {};
      } catch {
        return { redirect: '/login' }; // Not logged in → redirect
      }
    },
  },
  {
    path: "*",
    element: <Navigate to="/login" />,
  },
]);

const App = () => (
  <RouterProvider router={router} />
);

export default App;
