import React, { useState } from 'react'
import Forgot from '../components/forgotPassword/Forgot';
import Login from '../components/login/Login';
import Register from '../components/register/Register';
import "./authLayout.css";


const AuthLayout = () => {

    const [login, setLogin] = useState(true);
    const [register, setRegister] = useState(false);
    const [forgot, setForgot] = useState(false);

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
      {forgot && <Forgot />}
      {/* actions */}
      <div className="authlayout_actions">
        <p
          className="authlayout_actions-l"
          onClick={login ? handleRegister : handleLogin}
        >
          {login ? "Register ?" : "Login ?"}
        </p>
        <p className="authlayout_actions-r" onClick={handleForgot}>
          Forgot Password?
        </p>
      </div>
 
    </div>
  )
}

export default AuthLayout