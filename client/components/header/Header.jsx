import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios'
import './header.css';
import logo from "../../asserts/images/shopping-cart-logo.png";
import { useNavigate } from 'react-router-dom';
import { GlobalState } from '../../GlobalState';
import Cart from './icon/cart.svg';

export const Header = () => {
  const state = useContext(GlobalState)
  const [isLogged] = state.userAPI.isLogged
  const [isTrader] = state.userAPI.isTrader
  const [cart] = state.userAPI.cart

  const history = useNavigate();

      const logoutUser = async () =>{
        await axios.get('/user/logout')
        
        localStorage.removeItem('firstLogin')
        window.sessionStorage.clear();
        window.location.href = "/";
    }

  const traderRouter = () =>{
      return(
          <>
              <Link to="/create_product">Create Product</Link>
              <Link to="/promotions">Promotions</Link>              
              <Link to="/orders">Orders</Link>
          </>
      )
  }
  const customerRouter = () =>{
    return(
        <>
        <Link to="/watchList">Wish List</Link>
        </>
    )
}

  const loggedRouter = () =>{
      return(
          <>
        
             <Link to="/" onClick={logoutUser}>Logout</Link>
          </>
      )
  }

  const handleOnClick=()=>{
    history('/authentication');
  }
  return (
      <div className='header'>
           <a href='/'>
          <div className='logo'>
         
              <img src={logo} />
              <h1>Shopping Cart</h1>
            
              
          </div>
          </a>
          <div className='navigetor'>
           
            {isTrader? traderRouter():customerRouter()}
            {
                    isLogged ? loggedRouter() :<button onClick={handleOnClick}>Login</button>
            }

            {
                isTrader ? '' 
                :<div className="cart-icon">
                    <span>{cart.length}</span>
                    <Link to="/cart">
                        <img src={Cart} alt="" width="30" />
                    </Link>
                </div>
            }

           
            
          </div>        
         



      </div>
  )
}
