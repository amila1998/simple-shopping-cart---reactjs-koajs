import React, {useContext, useEffect, useState} from 'react';
import {GlobalState} from '../../GlobalState';
import {Link} from 'react-router-dom';
import axios from 'axios';
//import './history.css';


function OrderHistory() {
    const state = useContext(GlobalState)
    const [history, setHistory] = useState([]);
    const [isTrader] = state.userAPI.isTrader
    const [token] = state.token
    

    useEffect(() => {
        if(token){
            const getHistory = async() =>{
                try {
                    if(isTrader){
                        const res = await axios.get('http://localhost:5000/orders/getOrders', {
                            headers: {Authorization: token}
                        })
                        console.log(res.data.cart)
                        setHistory(res.data)
                        
                    }
                } catch (err) {
                   alert(err.message);
                }
              
            }
            getHistory()
        }
    },[token, isTrader, setHistory])

    return (
        <div className="history-page">

            <h2>Orders</h2>

            <h4>You have {history.length} ordered</h4>

            <table>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>User Email</th>
                        <th>Promotion Code</th>
                        <th>Items</th>
                        <th>Shipping Address</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        history.map(items => (
                            <tr key={items.orderID}>
                                <td>{items.orderID}</td>
                                <td><Link to={`/userDetails/${items.userEmail}`}>{items.userEmail}</Link></td>
                                <td>{items.promotionCode}</td>
                                <td><Link to={`/items/${items.orderID}`}>View</Link></td>
                                <td>{items.address}</td>
                                <td>{items.total}</td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </div>
    )
}

export default OrderHistory;