import React, {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import {GlobalState} from '../../../GlobalState';
import Loading from '../utils/loading/Loading';
import {useNavigate, useParams} from 'react-router-dom';
import  "./createProduct.css";


const initialState = {
    productitemID: '',
    title: '',
    price: 0,
    description: '',
    content: '',
    category: '',
    _id: ''
}

function CreateProduct() {
    const state = useContext(GlobalState)
    const [product, setProduct] = useState(initialState)

    const [isTrader] = state.userAPI.isTrader
    const [token] = state.token

    const history = useNavigate()
    const param = useParams()

    const [products] = state.productsAPI.products
    const [onEdit, setOnEdit] = useState(false)
    const [callback, setCallback] = state.productsAPI.callback

    useEffect(() => {
        if(param.itemID){
            setOnEdit(true)
            products.forEach(product => {
                if(product.itemID === param.itemID) {
                    setProduct(product)
                    setImages(product.images)
                }
            })
        }else{
            setOnEdit(false)
            setProduct(initialState)

        }
    }, [param.id, products])

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setProduct({...product, [name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isTrader) return alert("You're not an Trader");
            

            if(onEdit){
                const res=await axios.put(`/api/products/${product.itemID}`, {...product, images}, {
                    headers: {Authorization: token}
                })
                alert(res.data);
            }else{
                const res = await axios.post('/api/products', {...product, images}, {
                    headers: {Authorization: token}
                })
               alert(res.data);
            }
            setCallback(!callback)
            history.push("/")
        } catch (err) {
           alert(err.response.data.msg);
          
        }
    }

    return (
        <div className="create_product">

            <div className="upload"> 
                    <div id="file_img" style={styleUpload}>
                        <img src={product.img} alt=""/>
                        
                    </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="row">
                    <label htmlFor="productitemID">Product ID</label>
                    <input type="text" name="productitemID" id="productitemID" required
                    value={product.productitemID} onChange={handleChangeInput} disabled={onEdit} />
                </div>

                <div className="row">
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" id="title" required
                    value={product.title} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="price">Price</label>
                    <input type="number" name="price" id="price" required
                    value={product.price} onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="description">Description</label>
                    <textarea type="text" name="description" id="description" required
                    value={product.description} rows="5" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="content">Content</label>
                    <textarea type="text" name="content" id="content" required
                    value={product.content} rows="7" onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="categories">Categories: </label>
                    <select name="category" value={product.category} onChange={handleChangeInput} >
                        <option value="">Please select a category</option>
                        {
                            categories.map(category => (
                                <option value={category.itemID} key={category.itemID}>
                                    {category.name}
                                </option>
                            ))
                        }
                    </select>
                </div>

                <button type="submit">{onEdit? "Update" : "Create"}</button>
            </form>
        </div>
    )
}

export default CreateProduct;