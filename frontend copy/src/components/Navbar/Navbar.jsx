import React, { useContext, useRef, useState } from 'react'
import './Navbar.css'
import logo from '../assets/logo.png'
import cart_icon from '../assets/cart_icon.png'
import { Link } from 'react-router-dom'
import { ShopContext } from '../../context/ShopContext'
import nav_dropdown from '../assets/dropdown_icon.png'

export const Navbar = () => {

    const [menu,setMenu]=useState("shop");
    const {getTotalCartItems} =useContext(ShopContext);
    const menuRef =useRef();

    const dropdown =(e)=>{
        menuRef.current.classList.toggle('nav-menu-visible');
        e.target.classList.toggle('open');
    }

  return (
    <div className='navbar'>
        <div className='nav-logo'>
            {/* <img src={logo}/> */}
            <p>Rentify</p>  
        </div>
        <img className='nav-dropdown' onClick={dropdown} src={nav_dropdown} alt="" />
        <ul ref={menuRef} className='nav-menu'>
            <li onClick={()=>{setMenu("Home")}}><Link style={{textDecoration:'none'}} to="/">Home near -</Link>{menu==="Home"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("Hospital")}}><Link style={{textDecoration:'none'}} to="/Hospital">Hospital</Link>{menu==="Hospital"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("College")}}><Link style={{textDecoration:'none'}} to="/College">College</Link>{menu==="College"?<hr/>:<></>}</li>
            <li onClick={()=>{setMenu("School")}}><Link style={{textDecoration:'none'}} to="/School">School</Link>{menu==="School"?<hr/>:<></>}</li>
        </ul>
        <div className='nav-login-cart'>
            {
            localStorage.getItem('auth-token')
            ?<button onClick={()=>{localStorage.removeItem('auth-token'); window.location.replace('/')}}>Logout</button>
            :<Link to="/login"><button>Login</button></Link>
            }
            <Link to="/sell"><button>+ SELL</button></Link>
            {/* <div className='nav-cart-count'>{getTotalCartItems()}</div> */}
        </div>
    </div>
  )
}
