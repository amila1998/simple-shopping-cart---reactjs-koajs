import {useState, useEffect} from 'react';
import axios from 'axios';

import React from 'react'

const UserAPI = (token) => {

    const [isLogged, setIsLogged] = useState(false);
    const [isTrader, setIsTrader] = useState(false);
    const [cart, setCart] = useState([]);
    const [watchList, setWatchList] = useState([]);
    const [history, setHistory] = useState([]);
    const [userName, setuserName] = useState("");


    useEffect(() =>{
        if(token){
            const getUser = async () =>{
                try {
                    const res = await axios.get('http://localhost:5000/user/', {
                        headers: {Authorization: token}
                    })
                    setIsLogged(true)
                    res.data.role != 'trader' ? setIsTrader(false) : setIsTrader(true);
                    
                    setuserName(res.data.name)

                } catch (err) {
                    console.log(err.response.data)
                }
            }
            const getCart = async()=>{
                try {
                    const res = await axios.get('http://localhost:5000/items/getCart', {
                        headers: {Authorization: token}
                    })

                   console.log(res.status);
                   if (res.status!=200) {
                       
                   } else {
                   
                    setCart(res.data.cart.cart)
                   }
                  
                    

                } catch (err) {
                    console.log(err.response.data)
                }
            }

            const getWatchList = async()=>{
                try {
                    const res = await axios.get('http://localhost:5000/items/getWatchList', {
                        headers: {Authorization: token}
                    })

                   console.log(res.status);
                   if (res.status!=200) {
                       
                   } else {
                   
                    setWatchList(res.data.watchList.watchList)
                   }
                  
                    

                } catch (err) {
                    console.log(err.response.data)
                }
            }

            getUser()
            getCart()
            getWatchList()
            
        }
    },[token])


    const addCart = async (product) => {
        if(!isLogged) return alert("Please login to continue buying")

        const check = cart.every(item =>{
            return item.itemID !== product.itemID
        })

        if(check){
            setCart([...cart, {...product, quantity: 1}])

            await axios.post('http://localhost:5000/items/addCart', {cart: [...cart, {...product, quantity: 1}]}, {  
            headers: {Authorization: token}
            })

        }else{
            alert("This product has been added to cart.")
        }
    }

    const addWatchList = async (product) => {
        if(!isLogged) return alert("Please login to continue buying")

        const check = watchList.every(item =>{
            return item.itemID !== product.itemID
        })

        if(check){
            setWatchList([...watchList, {...product}])

            await axios.post('http://localhost:5000/items/addwatchList', {watchList: [...watchList, {...product}]}, {
                headers: {Authorization: token}
            })

        }else{
            alert("This product has been added to cart.")
        }
    }

  return {
    isLogged: [isLogged, setIsLogged],
    isTrader: [isTrader, setIsTrader],
    cart: [cart, setCart],
    addCart: addCart,
    watchList: [watchList, setWatchList],
    addWatchList: addWatchList,
    //history: [history, setHistory],
    user:[userName, setuserName]
}
}

export default UserAPI