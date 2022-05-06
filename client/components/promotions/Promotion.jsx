import React, {useState, useContext} from 'react';
import {GlobalState} from '../../GlobalState';
import axios from 'axios';

function Promotion() {
    const state = useContext(GlobalState)
    const [promotions] = state.promotionAPI.promotions
    const [promotion, setPromotion] = useState({
        promotionCode:"", title:"",description:"",precentage:""
    })
    const [token] = state.token
    const [callback, setCallback] = state.promotionAPI.callback
    const [onEdit, setOnEdit] = useState(false)
    const [id, setID] = useState('')


    const onChangeInput = (e) =>{
        const {name, value} = e.target;
        setPromotion({...promotion, [name]:value})
      }

    const createPromotion = async e =>{
        e.preventDefault()
        try {
            if(onEdit){
                try {
                    const res = await axios.put(`http://localhost:5000/items/updatePromotion/${id}`, {...promotion}, {
                        headers: {Authorization: token}
                    })
                    alert(res.data);
                    
                } catch (err) {
                    alert(err.message);
                }
               
            }else{
                try {
                    const res = await axios.post('http://localhost:5000/items/createPromotion', {...promotion}, {
                        headers: {Authorization: token}
                    })
                    alert(res.data);
                    
                } catch (err) {
                    alert(err.message);
                }
               
            }
            setOnEdit(false)
            setPromotion('')
            setCallback(!callback)
            
        } catch (err) {
            alert(err.response.data)
        }
    }

    const editPromotion = async (promotionCode,title,description,precentage) =>{
        setID(promotionCode)
        setPromotion(...promotion,{promotionCode,title,description,precentage})
        setOnEdit(true)
        window.location.href = "/promotions";
    }

    const deletePromotion = async id =>{
        try {
            const res = await axios.delete(`http://localhost:5000/items/deletePromotion/${id}`, {
                headers: {Authorization: token}
            })
            alert(res.data)
            setCallback(!callback)
        } catch (err) {
            alert(err.response.data);
           
        }
    }

    return (
        <div className="categories">

            <form onSubmit={createPromotion}>
                
                <label htmlFor="promotionCode">Promotion Code</label>
                {onEdit?<>
                    <input type="text" name="promotionCode" value={promotion.promotionCode} required
                onChange={onChangeInput} disabled/>
                
                </>:
                <>
                <input type="text" name="promotionCode" value={promotion.promotionCode} required
                onChange={onChangeInput} />
                
                </>}
                
                <label htmlFor="title">Title</label><span></span>
                <input type="text" name="title" value={promotion.title} required
                onChange={onChangeInput} /><span>  </span>
                <label htmlFor="description">Description</label>
                <input type="text" name="description" value={promotion.description} required
                onChange={onChangeInput} /><span>  </span>
                <label htmlFor="precentage">Precentage</label>
                <input type="number" name="precentage" value={promotion.precentage} required
                onChange={onChangeInput} /><span>%</span><span>  </span>

                <button type="submit">{onEdit? "Update" : "Create"}</button>
            </form>

            <div className="col">
                {
                    promotions.map(promotion => (
                        <div  key={promotion.promotionCode}>
                            <p>{promotion.promotionCode}  {promotion.title} {promotion.description}  {promotion.precentage}</p>
                            <div>
                                <button onClick={() => editPromotion(promotion.promotionCode, promotion.title,promotion.description,promotion.precentage)}>Edit</button>
                                <button onClick={() => deletePromotion(promotion.promotionCode)}>Delete</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Promotion;