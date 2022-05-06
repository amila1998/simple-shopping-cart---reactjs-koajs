import React, {useContext, useState, useEffect} from 'react';
import {useParams, Link} from 'react-router-dom';
import {GlobalState} from '../../GlobalState';
import ProductItem from '../productItem/ProductItem';
import './detailProduct.css';



function DetailProduct() {
    const params = useParams()
    const state = useContext(GlobalState)
    const [products] = state.productsAPI.products
    const addCart = state.userAPI.addCart
    const addWatchList = state.userAPI.addWatchList
    const [detailProduct, setDetailProduct] = useState([])

    useEffect(() =>{
        if(params.id){

            products.forEach(product => {
                if(product.itemID === params.id) setDetailProduct(product)
            })
        }
    },[params.id, products])

    if(detailProduct.length === 0) return null;

    return (
        <>
            <div className="detail">

                <img src={detailProduct.img} alt="" />
                <div className="box-detail">
                    <div className="row">
                        <h2>{detailProduct.title}</h2>
                        <h6>#id: {detailProduct.productitemID}</h6>
                    </div>
                    <span>$ {detailProduct.price}</span>
                    <p>{detailProduct.description}</p>
                    
                    <Link to="/cart" className="cart"
                    onClick={() => addCart(detailProduct)}>
                        Add to cart
                    </Link>
                    <Link to="" className="cart"
                     onClick={() => addWatchList(detailProduct)}>
                        Add to Watch List
                    </Link>
                </div>
            </div>

        </>
    )
}

export default DetailProduct;