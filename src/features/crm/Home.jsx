import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Navbar from './navbar/Navbar'
import "./Home.style.css"

function Home() {
  var navigate =useNavigate()
  useEffect(()=>{
    if(window.localStorage.getItem('token')){
         navigate('/')
    }
    else{
      navigate('/login')
    }
  },[])
  return (
    <div>
      <Navbar></Navbar>
        <div>
            <div className=' title'> 
              <b><i >Cheetan</i></b>
              </div>
              <div className='text-center text'>
              <p >Empower your business with our comprehensive CRM solution Manage</p>
              <p>customers, track tasks and boost sales efficiency effectively</p>
              </div>
        </div>
          <div className='d-flex align-items-center justify-content-center'>
            {/* <button className='getbtn'>Get Started</button> */}
            {/* <button className='getbtn '>Learn More</button> */}
            <p className='getbtn m-3 text-center p-3 rounded'>Get Started</p>
            <p className='getbtn m-3 text-center p-3 rounded'>Learn More</p>
          </div>
    </div>
  )
}

export default Home
