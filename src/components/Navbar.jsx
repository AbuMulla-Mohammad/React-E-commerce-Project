import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/User'
import './style/NavBar.css'
import { CartContext } from '../context/CartCont';

export default function Navbar() {
    const navigate = useNavigate();
    const { numberOfProducts } = useContext(CartContext);
    const { auth, setUserToken, setAuth  } = useContext(UserContext);
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
                        
                    </div>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                    {
                        auth ?
                            <>
                                <NavLink className=' NavLink icon text-decoration-none text-black position-relative' to='/cart'><span className='position-absolute bg-danger p-1 text-light rounded-circle'>{numberOfProducts}</span><img src="/cart.svg" alt="cart icon" /></NavLink>
                                <NavLink className=' NavLink icon text-decoration-none text-black' to='/profile'><img src="/profile.svg" alt="profile icon" /></NavLink>
                                <button className='logOutBtn' onClick={handleLogOutClick}>log out</button>
                            </>
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
