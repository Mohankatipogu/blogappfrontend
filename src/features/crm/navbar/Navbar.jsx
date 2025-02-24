import React from 'react'
import "./Navbar.css"
import logo_dark from "../assets/logo-black.png"
import search_black from "../assets/search-b.png"
import toogle_night from "../assets/day.png"
import { Link, useNavigate } from 'react-router-dom'

function Navbar() {
  var navigate=useNavigate()
    function Logout(){
       localStorage.clear()
       navigate('/login')
    }
  return (
    <div class='navbar shadow'>
        <img src={logo_dark} alt="" className='logo' />
        <ul>
         <Link to="/">
           <li>Home</li>
         </Link>
         <Link to="/addpost">
           <li>AddPost</li>
         </Link>
         <Link to="/">
           <li>About</li>
         </Link>
           <li onClick={(()=>{Logout()})}>Logout</li>
        </ul>
        
        <div className='serach-box'>
           <input type="text" placeholder='Search'/>
           <img src={search_black} alt="" />
        </div>
           <img  src={toogle_night} alt="" className='toggole-icon' />
    </div>
  )
}

export default Navbar
