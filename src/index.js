import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { store } from './app/store';
import { Provider } from 'react-redux';
import Login from './features/crm/login';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import Signup from './features/crm/signup';
import Home from './features/crm/Home';
import Addpost from './features/crm/addpost';
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
        path: '/addpost',
        element: <Addpost/>,
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
