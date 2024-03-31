import React, { useContext } from 'react'
import { UserContext } from '../../context/User'
import Categories from '../categories/Categories';
import { Outlet } from 'react-router-dom';
import Products from '../Products/Products';
import Slides from '../../components/Slides';



export default function Home() {
  const { auth } = useContext(UserContext);
  console.log(auth);
  return (
    <>
      <Slides/>
      <div className="d-flex flex-column gap-3">
      <Categories />
      <Products/>
      </div>
    </>
  )
}
