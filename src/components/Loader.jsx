import React from 'react'
import { InfinitySpin } from 'react-loader-spinner'
import './style/Loader.css'

export default function Loader() {
  return (
    <div className='loader'>
        <InfinitySpin
        visible={true}
        width="200"
        color="#000"
        ariaLabel="infinity-spin-loading"
        />
    </div>
  )
}
