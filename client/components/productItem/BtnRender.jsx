import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import {GlobalState} from '../../GlobalState';
import './productItem.css';

function BtnRender({product, deleteProduct}) {
    const state = useContext(GlobalState)
    const [isTrader] = state.userAPI.isTrader
    const addCart = state.userAPI.addCart

    
    return (
        <div className="row_btn">
            {
                isTrader ? 
                <>
                    <Link id="btn_buy" to="#!" 
                    onClick={() =>deleteProduct(product.itemID)}>
                        Delete
                    </Link>
                    <Link id="btn_view" to={`/edit_product/${product.itemID}`}>
                        Edit
                    </Link>
                </>
                : <>
                    <Link id="btn_buy" to="#!" onClick={() => addCart(product)}>
                       add to cart
                    </Link>
                    <Link id="btn_view" to={`/detail/${product.itemID}`}>
                        View
                    </Link>
                </>
            }
                
        </div>
    )
}

export default BtnRender;
