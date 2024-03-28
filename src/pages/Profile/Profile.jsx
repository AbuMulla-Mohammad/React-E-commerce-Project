import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'

export default function Profile() {
  return (
    <>
        <nav>
            <NavLink to='/profile/userOrders'>Orders</NavLink>
            <NavLink to='/profile/userInfo'>information</NavLink>
          </nav>
          <Outlet/>
    </>
  )
}
