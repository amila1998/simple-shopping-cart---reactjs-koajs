import React from 'react';
import './header.css';
import logo from "../../asserts/images/shopping-cart-logo.png";
import { useNavigate } from 'react-router-dom';

export const Header = () => {
const history = useNavigate();

const handleOnClick=()=>{
  history('/authentication');
}
  return (
    <div className='header'>
        <div className='logo'>
            <img src={logo} />            <h1>Shopping Cart</h1>
        </div>        
        <button onClick={handleOnClick}>Login</button>



    </div>
  )
}
