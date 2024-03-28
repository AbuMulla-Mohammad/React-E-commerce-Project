import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/User'
import './style/NavBar.css'

export default function Navbar() {
    const navigate = useNavigate();
    const { auth, setUserToken, setAuth } = useContext(UserContext);
    const handleLogOutClick = () => {
        setUserToken(null);
        setAuth(null);
        localStorage.removeItem('userToken');
        navigate('/login')
    }
    return (
        <>
            
            <nav className=' navbar border border-top-0 border-end-0 border-bottom-2 border-start-0 d-flex align-items-center justify-content-between  py-3 px-2' >
                <div className="container">
                    <div className="start d-flex gap-5 align-items-center ">
                        <p to='/' className='text-black fw-bold fs-2 text-decoration-none '>Exclusive</p>
                        <NavLink className=' NavLink text-decoration-none text-black' to='/'>Home</NavLink>
                        <NavLink className=' NavLink text-decoration-none text-black' to='/products'>Products</NavLink>
                        {
                        auth ?
                            <>
                                <NavLink className=' NavLink text-decoration-none text-black' to='/cart'>cart</NavLink>
                                <NavLink className=' NavLink text-decoration-none text-black' to='/profile'>Profile</NavLink>
                                <button className='logOutBtn' onClick={handleLogOutClick}>log out</button>
                            </>
                            :''
                    }
                    </div>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>

                    {
                        auth ?
                            ''
                            :
                            <>
                                <div className="auth d-flex gap-5 align-items-center ">
                                    <NavLink className='authNavLink text-decoration-none text-black' to='/signup'>SignUp</NavLink>
                                    <NavLink className='authNavLink text-decoration-none text-black' to='/login'>Login</NavLink>
                                </div>
                            </>
                    }


                </div>
            </nav>
            
        </>
    )
}
