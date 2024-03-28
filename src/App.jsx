import { useState } from 'react'
import './App.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Home from './pages/Home/Home';
import Root from './routs/Root';
import Signup from './pages/Signup/Signup';
import Login from './pages/Login/Login';
import UserContextProvider from './context/User';
import { ToastContainer } from 'react-toastify';
import SendCode from './pages/SendCode/SendCode';
import ForgotPassword from './pages/ForgotPassword/ForgotPassword';
import Categories from './pages/categories/Categories.jsx';
import ProductsCategory from './pages/ProductsCategory/ProductsCategory';
import Product from './pages/Product/Product.jsx';
import Products from './pages/Products/Products.jsx';
import Cart from './pages/Cart/Cart.jsx';
import Order from './pages/Order/Order.jsx';
import CartContextProvider from './context/CartCont.jsx';
import Profile from './pages/Profile/Profile.jsx';
import Orders from './pages/Profile/Orders.jsx';
import UserInfo from './pages/Profile/UserInfo.jsx';
import ProtectedRoutes from './auth/ProtectedRoutes.jsx';
import PublicRoutes from './auth/PublicRoutes.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children:[
      {
        path: '/',
        element:<Home />,
      },
      {
        path: '/signup',
        element:<PublicRoutes>
            <Signup />
          </PublicRoutes>,

      },
      {
        path: '/login',
        element:<PublicRoutes>
            <Login />
          </PublicRoutes>,
      },
      {
        path: '/sendcode',
        element:<SendCode />,
      },
      {
        path: '/forgotPassword',
        element:<ForgotPassword/>
      },
      {
        path: '/categories',
        element:<Categories/>
      },
      {
        path: '/productsCategory/:id',
        element:<ProductsCategory/>
      },
      {
        path: '/product/:id',
        element:<Product/>
      },
      {
        path: '/products',
        element:<Products/>
      },
      {
        path: '/cart',
        element:
          <ProtectedRoutes>
            <CartContextProvider>
              <Cart />
            </CartContextProvider>
          </ProtectedRoutes>
      },
      {
        path: '/order',
        element:<ProtectedRoutes>
            <CartContextProvider>
            <Order/>
            </CartContextProvider>
          </ProtectedRoutes>,
      },
      {
        path: '/profile',
        element: <ProtectedRoutes>
          <Profile />
        </ProtectedRoutes>,
        children: [
          {
            path: '/profile/userOrders',
            element:<Orders/>
          },
          {
            path: '/profile/userInfo',
            element:<UserInfo/>
          },
        ]
      }
    ]
  },
]);
function App() {


  return (
    <>
      <UserContextProvider>
        <RouterProvider router={router} />
        <ToastContainer/>
      </UserContextProvider>
      
    </>
  )
}

export default App
