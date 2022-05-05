import React, {useContext, useState} from 'react';
import {GlobalState} from '../../GlobalState';
import ProductItem from '../productItem/productItem';
import './products.css';
import { NoItems } from '../noItems/NoItems';


function Products() {
    const state = useContext(GlobalState)
    const [products, setProducts] = state.productsAPI.products
    const [isTrader] = state.userAPI.isTrader
    const [token] = state.token



    const deleteProduct = async(itemID) => {
        
    }

    return (
        <>
       
        <div className="products">
            {
                products.map(product => {
                    console.log(product.itemID)
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