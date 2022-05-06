import React, {useState, useContext, useEffect} from 'react';
import axios from 'axios';
import {GlobalState} from '../../GlobalState';
import {useNavigate, useParams} from 'react-router-dom';
import  "./createProduct.css";


const initialState = {
    itemID:'', title:'', price:'', description:'', category:'',qty:''
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
    

    useEffect(() => {
        if(param.itemID){
            setOnEdit(true)
            products.forEach(product => {
                if(product.itemID === param.itemID) {
                    setProduct(product)
 
                }
            })
        }else{
            setOnEdit(false)
            setProduct(initialState)

        }
    }, [param.itemID, products])

    const handleChangeInput = e =>{
        const {name, value} = e.target
        setProduct({...product, [name]:value})
    }

    const handleSubmit = async e =>{
        e.preventDefault()
        try {
            if(!isTrader) return alert("You're not an Trader");
            

            if(onEdit){
                console.log(product);
                const res=await axios.put(`http://localhost:5000/items/editItem/${product.itemID}`, {...product}, {
                    headers: {Authorization: token}
                })
                alert(res.data);
                console.log(res);
            }else{
                const res = await axios.post('http://localhost:5000/items/createItems', {...product}, {
                    headers: {Authorization: token}
                })
               alert(res.data);
               console.log(res.status);
            }
            window.location.href = "/";
        } catch (err) {
           alert(err.response);
           console.log(err);
          
        }
    }

    return (
        <div className="create_product">

            <div className="upload"> 
                    <div id="file_img">
                        <img src={product.img} alt=""/>
                        
                    </div>
            </div>

            <form onSubmit={handleSubmit}>
                {
                    onEdit?
                    <>
                    <div className="row">
                    <label htmlFor="itemID">Product ID</label>
                    <input type="text" name="itemID" id="itemID" required
                    value={product.itemID} onChange={handleChangeInput} disabled/>
                    </div>
                    </>
                    :
                    <>
                     <div className="row">
                    <label htmlFor="productitemID">Product ID</label>
                    <input type="text" name="itemID" id="itemID" required
                    value={product.itemID} onChange={handleChangeInput}/>
                    </div>
                    </>
                }

                

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
                    <label htmlFor="qty">Qty</label>
                    <input type="number" name="qty" id="qty" required
                    value={product.qty}  onChange={handleChangeInput} />
                </div>

                <div className="row">
                    <label htmlFor="category">Category: </label>
                    <input type="text" name="category" id="category" required
                    value={product.category} onChange={handleChangeInput} />
                </div>

                <button type="submit">{onEdit? "Update" : "Create"}</button>
            </form>
        </div>
    )
}

export default CreateProduct;