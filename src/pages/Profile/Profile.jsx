import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import './Profile.css'
export default function Profile() {
  return (
    <>
          <nav className='profileNav container border border-top-0 border-end-0 border-bottom-2 border-start-0 d-flex align-items-center gap-3  py-3 px-2'>
            <NavLink className='NavLink' to='/profile/userOrders'>Orders</NavLink>
            <NavLink className='NavLink' to='/profile'>User Information</NavLink>
          </nav>
          <Outlet/>
    </>
  )
}
