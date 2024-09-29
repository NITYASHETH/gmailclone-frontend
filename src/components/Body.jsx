import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from './Sidebar'
import { useSelector } from 'react-redux'

const Body = () => {
  const {user} = useSelector(store=>store.app);
  const navigate = useNavigate();
  useEffect(()=>{
    if(!user){
       navigate("/login");
    }
  })
  return (

      <div className='flex'>
      <Sidebar/>
      <Outlet/>
      </div>

  )
}

export default Body
