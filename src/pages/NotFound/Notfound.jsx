import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import './NotFound.css'

export default function Notfound() {

    return (
    <div className='notFound '>
        <h2>404 page not found</h2>
        <Link className='button' to='/'>Go To Home Page</Link>
    </div>
  )
}
