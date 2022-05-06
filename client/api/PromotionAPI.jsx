import {useState, useEffect} from 'react'
import axios from 'axios'

function PromotionAPI() {
    const [promotions, setPromotions] = useState([])
    const [callback, setCallback] = useState(false)

    useEffect(() =>{
        const getPromotions = async () =>{
            try {
                const res = await axios.get('http://localhost:5000/items/viewPromotions')
                console.log(res);
                setPromotions(res.data)
            } catch (error) {

                
            }
            
        }

        getPromotions()
    },[callback])
    return {
        
        promotions: [promotions, setPromotions],
        callback: [callback, setCallback]
    }
}

export default PromotionAPI