import React, { useState } from 'react'
import Login from '../components/login/Login';
import Register from '../components/register/Register';
import "./authLayout.css";


const AuthLayout = () => {

    const [login, setLogin] = useState(true);
    const [register, setRegister] = useState(false);


    const handleLogin = () => {
        setLogin(true);
        setRegister(false);
        setForgot(false);
    };
    const handleRegister = () => {
        setLogin(false);
        setRegister(true);
        setForgot(false);
    };
    const handleForgot = () => {
        setLogin(false);
        setRegister(false);
        setForgot(true);
    };




  return (
    <div className="authlayout">

      {/* form */}
      {login && <Login />}
      {register && <Register />}

      {/* actions */}
      <div className="authlayout_actions">
        <p
          className="authlayout_actions-l"
          onClick={login ? handleRegister : handleLogin}
        >
          {login ? "Register ?" : "Login ?"}
        </p>
      </div>
 
    </div>
  )
}

export default AuthLayout