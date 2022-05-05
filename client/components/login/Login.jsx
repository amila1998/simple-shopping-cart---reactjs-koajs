import React,{Suspense, useState} from 'react';
import axios from 'axios';
import './login.css';

const Login = () => {
  const [user, setUser] = useState({
    email:'', password: ''
});

const onChangeInput = (e) =>{
  const {name, value} = e.target;
  setUser({...user, [name]:value})
}

const loginSubmit = async (e) =>{
  e.preventDefault()
  try {
      const res = await axios.post('http://localhost:5000/user/login', {...user})
      alert(res.data.msg);

      localStorage.setItem('firstLogin', true);
      window.sessionStorage.setItem("_t@ken", res.data.token);
      window.location.href = "/";
     
  } catch (err) {
      alert(err.response.data);
  }
}
  return (
    <div className="login-page">
            <form onSubmit={loginSubmit}>
                <h2>Login</h2>
                <input type="email" name="email" required
                placeholder="Email" value={user.email} onChange={onChangeInput} />

                <input type="password" name="password" required autoComplete="on"
                placeholder="Password" value={user.password} onChange={onChangeInput} />

                <div className="row">
                    <button type="submit">Login</button>
                </div>
            </form>
        </div>
  )
}

export default Login