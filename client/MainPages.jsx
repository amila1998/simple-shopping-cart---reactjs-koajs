import React, { useContext } from 'react'
import {Navigate, Route, Routes } from 'react-router-dom'
import Cart from './components/cart/cart'
import CreateProduct from './components/createProduct/CreateProduct'
import DetailProduct from './components/detailProduct/DetailProduct'
import Products from './components/products/Products'
import WatchedList from './components/watchedList/watchedList'
import { GlobalState } from './GlobalState'
import AuthLayout from './layouts/AuthLayout'

const MainPages = () => {
    const state = useContext(GlobalState)
    const [isLogged] = state.userAPI.isLogged
    const [isTrader] = state.userAPI.isTrader
  return (
    <Routes>
            <Route path="/" element={<Products/>} />
            <Route path="/authentication" element={isLogged ? <Navigate to="/"/> : <AuthLayout/>} />
            <Route path="/cart" element={<Cart/>} />
            <Route path="/watchList" element={<WatchedList/>} />
            <Route path="/detail/:id" element={<DetailProduct/>}/>
            <Route path="/create_product" element={isTrader ? <CreateProduct/> : <Navigate to="/"/>} />
            <Route path="/edit_product/:itemID" element={isTrader ? <CreateProduct/> : <Navigate to="/"/>} />
    </Routes>
  )
}

export default MainPages;