import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { GlobalState } from "../../GlobalState";


const UserDetails = () => {
    const state = useContext(GlobalState);
    const [token] = state.token;
    const params = useParams();
    const userEmail = params.email;
    const [email, setEmail] = useState('');
    const [name, setName] = useState('')

useEffect(() => {
  const getUserDetails = async()=>{

    const res = await axios.get(`http://localhost:5000/user/getUserDetails/${userEmail}`, {
        headers: {Authorization: token}
    });
    setEmail(res.data.email);
    setName(res.data.name)
  }
  getUserDetails();
}, [token])


  return (
    <div>
        <center>
            <h1>User Details</h1> <br/><br/>
            <h3>Name : {name}</h3><br/>
            <h3>Email : {email}</h3>
            
        </center>

    </div>
  )
}

export default UserDetails