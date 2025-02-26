import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import Login from './features/crm/login';
import "fontawesome-free/css/all.min.css"
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Signup from './features/crm/signup';
import Home from './features/crm/Home';
import Footer from './features/crm/footer';
import Dashboard from './features/crm/dashboard';
import GoogleAuth from './features/crm/Auth';
import BlogUpload from './features/crm/uploadblog';
const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path:"/",
        element:<Home></Home>
      },
      {
        path: '/login',
        element: <Login />,
      },
      {
        path: '/signup',
        element: <Signup />,
      },
      {
        path: '/footer',
        element: <Footer />,
      },
      {
        path: '/dashboard',
        element: <Dashboard></Dashboard>,
      },
      {
        path: '/auth',
        element:<GoogleAuth></GoogleAuth>
      },
      {
        path: '/blogupload',
        element:<BlogUpload></BlogUpload>
      },
    ],
  },
]);

const root = createRoot(document.getElementById('root'));

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);
