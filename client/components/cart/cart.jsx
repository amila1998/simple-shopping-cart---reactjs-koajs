import React, {useContext, useState, useEffect} from 'react';
import {GlobalState} from '../../GlobalState';
import axios from 'axios';
import './cart.css';


function Cart() {
    const state = useContext(GlobalState);
    const [user] = state.userAPI.user;
    const [cart, setCart] = state.userAPI.cart;
    const [token] = state.token;
    const [total, setTotal] = useState(0);
    const [address, setAddress] = useState("");
    const [promotionCode, setPromotionCode] = useState("");
    const [checkPCode, setCheckPCode]=useState(false);

    const handleChange = (e) => {
        setAddress(e.target.value);
      };

      const handleChange2 = (e) => {
        setPromotionCode(e.target.value);
      };
   

    useEffect(() =>{
        const getTotal = () =>{
            const total = cart.reduce((prev, item) => {
                return prev + (item.price * item.quantity)
            },0)

            setTotal(total)
        }

        getTotal()

    },[cart])

    useEffect(() =>{
        const check =async()=>{
            if (promotionCode!="") {
                const res =await axios.get(`http://localhost:5000/items/getAPromotionCode/${promotionCode}`);
                if (res.status!=200) {
                    setCheckPCode(false)
                } else {
                    setCheckPCode(true)
                }
                
            } else {
                setCheckPCode(false)
            }
        }
        check();

    },[])

    const addToCart = async (cart) =>{
       try {
        const res = await axios.post('http://localhost:5000/items/addCart', {cart}, {
            headers: {Authorization: token}
        })
        alert(res.data.msg);
       } catch (err) {
        alert(err.message.data);
       }
    }


    const removeProduct = id =>{
        if(window.confirm("Do you want to delete this product?")){
            cart.forEach((item, index) => {
                if(item.itemID === id){
                    cart.splice(index, 1)
                }
            })

            setCart([...cart])
            addToCart(cart)
        }
    }

    const tranSuccess = async() => {
        if(address==""){
            alert("Pleace fill the Shipping Address");

        }else{
            try {
                const res = await axios.post('http://localhost:5000/orders/addOrder', {cart, total, address , promotionCode}, {
                    headers: {Authorization: token}
                })
                alert(res.data);
                    setCart([])
                    addToCart([])
            
                
            } catch (err) {
                alert(err.message);
            }
           
        }
    }


    if(cart.length === 0) 
        return <h2 style={{textAlign: "center", fontSize: "5rem"}}>Cart Empty</h2> 

    return (
        <div className='cartMain'> 
            <div className='cartL'>
                    <div>
                        <label>Name: {user}</label><br/><br/>
                        <label>Payment Type: Cash on Delivery</label><br/><br/>
                        <label>Promotion Code: </label><br/>
                        <input type="text" onChange={handleChange2}/><br/>
                            {promotionCode!=""&& !checkPCode && <><label className='err'>Invalide Promotion code</label><br/></>}<br/>
                        <label>Shipping Address: </label><br/>
                        <textarea onChange={handleChange}  id='txt1' required></textarea>
                    </div>
                    <h3 className="total"> Total: $ {total}</h3>
                    <button  onClick={tranSuccess} > placed an order </button>
 
            </div>
            <div className='cartR'>
           
           {
               cart.map(product => (
                   <div className="cdetail cart" key={product._id}>
                       <img src={product.img} alt="" />

                       <div className="cbox-detail">
                           <h2>{product.title}</h2>

                           <h3>$ {product.price * product.quantity}</h3>
                           <p>{product.description}</p>
                           <p>{product.content}</p>
                           
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

export default Cart;