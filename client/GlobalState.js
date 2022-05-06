import React, { createContext, useEffect, useState } from 'react'
import ProductsAPI from './api/ProductsAPI'
import UserAPI from './api/UserAPI'
import PromotionAPI from './api/PromotionAPI'


import axios from 'axios'

export const GlobalState = createContext()


export const DataProvider = ({children}) =>{
    const [token, setToken] = useState(false)


    useEffect(() =>{
        const firstLogin = localStorage.getItem('firstLogin')
        if(firstLogin){
            const accesToken = window.sessionStorage.getItem("_t@ken");
            const refreshToken = async () =>{
                try {
                    const res = await axios.get(`http://localhost:5000/user/refresh_token/${accesToken}`);
                    setToken(res.data.accesstoken)
                    setTimeout(() => {
                        refreshToken();

                    },10 * 60 * 1000)
                } catch (error) {
                    console.log(error);
                    alert(error.response.data);
                    localStorage.clear();
                    window.sessionStorage.clear();
                    window.location.href = "/";
                    
                }
            }
            refreshToken()
        }
    },[])


    
    const state = {
        token: [token, setToken],
        productsAPI: ProductsAPI(),
        userAPI: UserAPI(token),
        promotionAPI:PromotionAPI(),
        
        
    }

    return (
        <GlobalState.Provider value={state}>
            {children}
        </GlobalState.Provider>
    )
}