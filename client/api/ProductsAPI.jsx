import {useState, useEffect} from 'react'
import axios from 'axios'


function ProductsAPI() {
    const [products, setProducts] = useState([])


    useEffect(() =>{
        const getProducts = async () => {
            const res = await axios.get(`http://localhost:5000/items/allItems`);
            console.log(res)
            setProducts(res.data)
        }
        getProducts()
    },[])
    
    return {
        products: [products, setProducts],
    }
}

export default ProductsAPI