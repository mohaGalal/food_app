import React, { useContext } from 'react'
import avatar from '../../../../assets/images/Ellipse 235.png'
import { AuthContext } from '../../../../context/AuthContext'

export default function Navbar() {
  let {loginData} = useContext(AuthContext)
  return (
    <div className='bg-white py-2 d-flex justify-content-end align-items-center'>
      <img className='mx-3' src={avatar} alt='user-image'/>
      <span >{loginData?.userName}</span>
    </div>
  )
}
