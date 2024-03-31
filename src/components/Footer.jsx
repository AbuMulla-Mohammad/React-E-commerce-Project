import React from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import './style/Footer.css'

export default function Footer() {
  return (
    <>

      <footer >
        <div className="container d-flex justify-content-between flex-wrap text-center">
          <h2 className="logo col-xxl-2 col-xl-2 col-lg-2 col-md-6 col-sm-12  mt-md-5 mt-sm-5">
            Exclusive
          </h2>
          <nav className='d-flex flex-column gap-2 col-xxl-2 col-xl-2 col-lg-2 col-md-6 col-sm-12 mt-md-5 mt-sm-5'>
            <h2>Support</h2>
            <p>111 Bijoy sarani, Dhaka,  DH 1515, Bangladesh.</p>
            <span>exclusive@gmail.com</span>
            <span>+88015-88888-9999</span>
          </nav>
          <nav className='d-flex flex-column gap-2 col-xxl-2 col-xl-2 col-lg-2 col-md-6 col-sm-12  mt-md-5 mt-sm-5'>
            <h2><Link className='Link' to="">Account</Link></h2>
            <Link className='Link'>Cart</Link>
            <Link className='Link' to=''>shop</Link>
          </nav>
          <nav className='d-flex flex-column gap-2 col-xxl-2 col-xl-2 col-lg-2 col-md-6 col-sm-12 mt-md-5 mt-sm-5'>
            <h2>Quick Link</h2>
            <Link className='Link'>Privacy Policy</Link>
            <Link className='Link'>Terms Of Use</Link>
            <Link className='Link'>FAQ</Link>
            <Link className='Link'>Contact</Link>
          </nav>
        </div>
      </footer>
    </>
  )
}
