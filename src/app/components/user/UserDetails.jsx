
import React from 'react'
import { Tab } from '..'

const UserDetails = () => {
  return (
    <div className="flex itstrongs-center h-[300px] justify-around">
      <div style={{textAlign:'start',paddingBottom:74,}}>User details
        <div className='flex'>
          <p className='m-1'>  <strong>Alvin Ana  </strong> #9753428</p> 
          <button className='m-1'style={{backgroundColor:'green',padding:6,color:'white', borderRadius:3}}>Active</button>
          <p className='m-1 text-blue'>edit</p>
        </div>
        <div className='flex'>
            <div className='m-2'>
                <ol>
                  <li>Email:</li>
                  <li>Tel:</li>
                  <li>Joined:</li>
                  <li>Activated:</li>
                  <li>Address:</li>
                </ol>

            </div>
            <div className='space h-2 w-2'></div>
            <div className='m-2'>
            <ol>
                  <li>mail@gmail.com</li>
                  <li>+237 999 999 999</li>
                  <li>07/07/2023</li>
                  <li>08/12/2023</li>
                  <li>Buea town</li>
                </ol>
            </div>
        </div>
       
        {/* <div className='h-[90%] w-[2px] bg-black' ></div> */}

        {/* <div>
          
        </div> */}
      </div>
      <div className='h-[90%] w-[2px] bg-black' ></div>
      {/* the code below is for the balance section */}
      <div><strong>BALANCE DETAILS</strong>
      <div className='flex text'>
          <div className='m-2'>
              <p className='text-blue'><strong>Available Banlance</strong></p>
              <p>XAF 5000</p>
            </div>
            <div className='m-2'>
            <p><strong>Transferred </strong></p>
              <p>XAF 5000</p>
            </div>
      </div>
        
        {/* <div className='h-[90%] w-[2px] bg-black' ></div> */}
        <div className='flex'>
        <div className='m-2'>
        <p> <strong>Negative Banlance</strong></p>
          <p>XAF 5000</p>
        </div>
        <div className='m-2'>
        <p><strong>Fees</strong></p>
          <p>XAF 5000</p>
        </div>

        </div>
        
      </div>
      {/* <div>
        <Tab Employer1 />
      </div> */}
    </div>
      )
}

export default UserDetails