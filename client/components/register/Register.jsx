import React from 'react';
import React, {useState} from 'react';
import axios from 'axios';
import '../login/login.css';


const Register = () => {
  const [user, setUser] = useState({
    name:'', email:'', password:'', role:'', cPassword:''
})
const {name, email, password, role, cPassword} = user

const onChangeInput = e =>{
    setUser({ ...user, [e.target.name]: e.target.value });
}

const registerSubmit = async e =>{
    e.preventDefault()
    try {
      if (password!=cPassword) {
        alert("Password not match");
      } else {
        
        const res = await axios.post('http://localhost:5000/user/register', {name,email,password,role});
        alert(res.data.msg);
        window.location.href = "/authentication";
      }
        
    } catch (err) {
        alert(err.response.data);
    }
}
  return (
    <div className="login-page">
            <form onSubmit={registerSubmit}>
                <h2>Register</h2>
             
                <select name="role" id="role" onChange={onChangeInput}>
                    <option value="" selected disabled>Choose Your Role...</option>
                    <option value="customer">Customer</option>
                    <option value="trader">Trader</option>
                  </select>

                <input type="text" name="name" required
                placeholder="Name" value={user.name} onChange={onChangeInput} />

                <input type="email" name="email" required
                placeholder="Email" value={user.email} onChange={onChangeInput} />

                <input type="password" name="password" required autoComplete="on"
                placeholder="Password" value={user.password} onChange={onChangeInput} />

                <input type="password" name="cPassword" required autoComplete="on"
                placeholder="Conform Password" value={user.cPassword} onChange={onChangeInput} />

                <div className="row">
                    <button type="submit">Register</button>
                </div>
            </form>
        </div>
  )
}

export default Register