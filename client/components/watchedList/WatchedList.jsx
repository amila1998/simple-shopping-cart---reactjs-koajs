import React, {useContext, useState, useEffect} from 'react';
import {GlobalState} from '../../GlobalState';
import axios from 'axios';
import '../cart/cart.css';


function WatchedList() {
    const state = useContext(GlobalState)
    const [user] = state.userAPI.user
    const [watchList, setWatchList] = state.userAPI.watchList
    const [token] = state.token
    const [total, setTotal] = useState(0)
    const [address, setAddress] = useState("")

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
        const res = await axios.patch('http://localhost:5000/items/addWatchList', {watchList}, {
            headers: {Authorization: token}
        })
        alert(res.data.msg);
       } catch (err) {
        alert(err.message.data);
       }
    }


    const increment = (id) =>{
        watchList.forEach(item => {
            if(item._id === id){
                item.quantity += 1
            }
        })

        setWatchList([...watchList])
        addToWatchList(watchList)
    }

    const decrement = (id) =>{
        watchList.forEach(item => {
            if(item.itemID === id){
                item.quantity === 1 ? item.quantity = 1 : item.quantity -= 1
            }
        })

        setWatchList([...watchList])
        addToWatchList(watchList)
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

    const tranSuccess = async() => {
        if(address==""){
            alert("Pleace fill the Shipping Address");

        }else{
            try {
                const res = await axios.post('/api/order', {watchList, total, address}, {
                    headers: {Authorization: token}
                })
                alert(res.data.msg);
                    setWatchList([])
                    addToWatchList([])
            
                
            } catch (err) {
                alert(err.message);
            }
           
        }

       

        
       
    }


    if(watchList.length === 0) 
        return <h2 style={{textAlign: "center", fontSize: "5rem"}}>watchList Empty</h2> 

    return (
        <div className='cartMain'> 
            <div className='cartL'>
                    <div>
                        <label>Name: {user}</label><br/><br/>
                        <label>Payment Type: Cash on Delivery</label><br/><br/>
                        <label>Shipping Address: </label>
                        <textarea onChange={handleChange}  id='txt1'></textarea>
                    </div>
                    <h3 className="total"> Total: $ {total}</h3>
                    <button  onClick={tranSuccess} > placed an order </button>
 
            </div>
            <div className='cartR'>
           
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
                               <button onClick={() => decrement(product.itemID)}> - </button>
                               <span>{product.quantity}</span>
                               <button onClick={() => increment(product.itemID)}> + </button>
                           </div>
                           
                           <div className="delete" 
                           onClick={() => removeProduct(product.itemID)}>
                               X
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