import React, {useContext, useState} from 'react';
import {GlobalState} from '../../GlobalState';
import ProductItem from '../productItem/productItem';
import './products.css';
import { NoItems } from '../noItems/NoItems';
import axios from 'axios';


function Products() {
    const state = useContext(GlobalState)
    const [products, setProducts] = state.productsAPI.products
    const [isTrader] = state.userAPI.isTrader
    const [token] = state.token



    const deleteProduct = async(itemID) => {
        try {
                const deleteProduct = axios.delete(`http://localhost:5000/items/deleteItem/${itemID}`, {
                headers: {Authorization: token}
            })
            console.log(deleteProduct);
            alert("Deleted a Product");
            window.location.href = "/";
           
        } catch (err) {
            console.log(err);
            alert(err.response.data);
        }
    }

    return (
        <>
       
        <div className="products">
            {
                products.map(product => {
                    return <ProductItem key={product.itemID} product={product}
                    isTrader={isTrader} deleteProduct={deleteProduct} />
                })
            } 
        </div>

        {products.length === 0 && <NoItems/>}
        </>
    )
}

export default Products;