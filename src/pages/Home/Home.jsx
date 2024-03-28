import React, { useContext } from 'react'
import { UserContext } from '../../context/User'
import Categories from '../categories/Categories';
import { Outlet } from 'react-router-dom';
import Products from '../Products/Products';

export default function Home() {
  const { auth } = useContext(UserContext);
  console.log(auth);
  return (
    <>
      this is home
      <br />
      hey {auth ? auth.userName : ''}
      <Categories />
      <Products/>
    </>
  )
}
