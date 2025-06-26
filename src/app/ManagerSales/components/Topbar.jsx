"use client";
import React from 'react'
import { FaBars, FaBell} from 'react-icons/fa'

const Topbar = () => {
  return (
    <>
      <div className='flex items-center justify-between px-6 py-6 bg-white shadow border-b ml-64'>
      <div className='flex items-center space-x-3'>
        <FaBars className='text-[#1F263E] text-lg'/>
        <span className='text-gray-800 font-medium text-lg'>ຈັດການການຂາຍ</span>
      </div>
      <div className='flex items-center space-x-3'>
        <FaBell className='text-[#1F263E] text-lg'/>
        <span className='text-gray-800 font-medium text-lg'>Thadsaphone SHALLIO</span>
      </div>
    </div>

    </>
    
  )
}

export default Topbar