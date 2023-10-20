
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Tab } from '..'

const UserDetails = () => {
  return (
    <div className="flex itstrongs-center h-[300px] justify-around">
      
      <div style={{textAlign:'start',paddingBottom:74,}}>
    <h2 style={{textAlign:'left', marginBottom:15}}>User details</h2>
        
        <div className='flex'>
          <p className='m-2'>  <strong>Alvin Ana  </strong> #9753428</p> 
          <button className='m-1'style={{backgroundColor:'green',padding:6,color:'white', borderRadius:3}}>Active</button>
          <FontAwesomeIcon icon={faEdit} />
          <p className='m-2'>edit</p>
          
        </div>
        <div className='flex'>
            <div className='m-3'>
                <ol>
                  <li>Email:</li>
                  <li>Tel:</li>
                  <li>Joined:</li>
                  <li>Activated:</li>
                  <li>Address:</li>
                </ol>

            </div>
            <div className='space h-1 w-2'></div>
            <div className='m-3'>
            <ol>
                  <li>mail@gmail.com</li>
                  <li>+237 999 999 999</li>
                  <li>07/07/2023</li>
                  <li>08/12/2023</li>
                  <li>Buea town</li>
                </ol>
            </div>
        </div>
       
        </div>
      <div className='h-[90%] w-[2px] bg-black' ></div>
      {/* the code below is for the balance section */}
      <div style={{textAlign:'center', marginBottom:3}}><strong>BALANCE DETAILS</strong>
      <div className='flex text'>
          <div className='m-10'>
              <p className='text-blue'>Available Banlance</p>
              <p style={{color:'#063B87', fontSize:20}}>XAF 5000</p>
            </div>
            <div className='m-10'>
            <p style={{fontSize:15}}>Transferred </p>
            <p style={{color:'#063B87', fontSize:20}}>XAF 5000</p>
            </div>
      </div>
        
        {/* <div className='h-[90%] w-[2px] bg-black' ></div> */}
        <div className='flex'>
        <div className='m-10'>
        <p > Negative Banlance</p>
        <p style={{color:'#063B87', fontSize:20}}>XAF 5000</p>
        </div>
        <div className='m-10'>
        <p>Fees</p>
        <p style={{color:'#063B87', fontSize:20}}>XAF 5000</p>
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