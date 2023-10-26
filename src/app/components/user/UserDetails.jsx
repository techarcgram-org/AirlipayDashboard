
import React from 'react'
import HomePage from '../common/homePage'

const UserDetails = () => {
  return (
    <div className="flex items-center h-[300px] justify-around">
      <div>side 1</div>
      <div className='h-[90%] w-[2px] bg-black' ></div>
      <div>side 2</div>
      <HomePage/>
    </div>
  )
}

export default UserDetails
