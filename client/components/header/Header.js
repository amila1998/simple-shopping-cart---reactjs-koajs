import React from 'react';
import './header.css';
import logo from "../../asserts/images/shopping-cart-logo.png";

export const Header = () => {

  return (
    <div className='header'>
        <div className='logo'>
            <img src={logo} />            <h1>Shopping Cart</h1>
        </div>        
        <button value="">Login</button>



    </div>
  )
}
