import React, {useContext, useState, useEffect} from 'react';
import {GlobalState} from '../../GlobalState';
import axios from 'axios';
import '../cart/cart.css';
import { Link } from 'react-router-dom';


function WatchedList() {
    const state = useContext(GlobalState)
    const [user] = state.userAPI.user
    const [watchList, setWatchList] = state.userAPI.watchList
    const [token] = state.token
    const [total, setTotal] = useState(0)
    const [address, setAddress] = useState("")
    const addCart = state.userAPI.addCart

    const handleChange = (e) => {
        setAddress(e.target.value);
      };
   

    useEffect(() =>{
        const getTotal = () =>{
            const total = watchList.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)

            setTotal(total)
        }

        getTotal()

    },[watchList])

    const addToWatchList = async (watchList) =>{
       try {
        const res = await axios.post('http://localhost:5000/items/addWatchList', {watchList}, {
            headers: {Authorization: token}
        })
        alert(res.data.msg);
       } catch (err) {
        alert(err.message.data);
       }
    }


    const removeProduct = id =>{
        if(window.confirm("Do you want to delete this product?")){
           watchList.forEach((item, index) => {
                if(item.itemID === id){
                    watchList.splice(index, 1)
                }
            })

            setWatchList([...watchList])
            addToWatchList(watchList)
        }
    }



    if(watchList?.length === 0) 
        return <h2 style={{textAlign: "center", fontSize: "5rem"}}>watchList Empty</h2> 

    return (
        <div className='cartMain'> 
           
            <div >
           
           {
               watchList.map(product => (
                   <div className="cdetail cart" key={product._id}>
                       <img src={product.img} alt="" />

                       <div className="cbox-detail">
                           <h2>{product.title}</h2>

                           <h3>$ {product.price * product.quantity}</h3>
                           <p>{product.description}</p>
                           <p>{product.content}</p>

                           <div className="amount">
                                <Link id="btn_buy" to="#!" onClick={() => addCart(product)}>
                                add to cart
                                </Link>
                                <Link id="btn_view" to={`/detail/${product.itemID}`}>
                                    View
                                </Link>
                           </div>
                           
                           <div className="delete" 
                           onClick={() => removeProduct(product.itemID)}>
                               remove
                           </div>
                       </div>
                   </div>
               ))
           }
           </div>

           
        </div>
  
    )
}

export default WatchedList;