import React from 'react'
import './index.css'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdLogIn } from "react-icons/io";
import { useState } from 'react'
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";
import axios from 'axios'
import Cookies from 'js-cookie'


const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("Admin")

    const changePassword = (event) => {
        setPassword(event.target.value)
    }

    const changeRole = (event) => {
        setRole(event.target.value)
    }



    const changeEmail = (event) => {
        setEmail(event.target.value)
    }

    

    const navigate=useNavigate()
    const handleLoginSubmit =  (event) => {
        event.preventDefault()
        const values = {  email: email, password: password, role: role }
        const url="https://roxilerinternship.onrender.com/login"
        axios.post(url,values)
        .then(response=>{ 
          console.log(response.data.jwtToken)
          const jwtToken=response.data.jwtToken
          if(response.data==="Login Success!"){
            alert("Login Success")
          }
          Cookies.set('role',role,{expires:30})
          Cookies.set('jwt_token', jwtToken, {expires: 30})
          navigate("/home")
          
        })
        .catch(error=>{
            console.log(error.response.data)
            alert(error.response.data)
        })

        

    }
    
    

    return ( 
        <div className="register-container">
            <img src="https://res.cloudinary.com/darsfmavs/image/upload/v1744136162/3094352-removebg-preview_ezykb0.png" alt="USER LOGIN" className='login-png' />
            <div className="register-card">
                <div className='login-text-animation'>
                    <h1 className="register-text" >Login</h1>
                </div>
                <form className='login-container' onSubmit={handleLoginSubmit} >
                    <label className='login-label' htmlFor='email-input'>EMAIL</label>
                    <input required type="email" className='input-container' placeholder='ENTER EMAIL' id="email-input" value={email} onChange={changeEmail} />
                    <label className='login-label' htmlFor='password-input'>PASSWORD</label>
                    <input required type="password" className='input-container' placeholder='ENTER PASSWORD' id="password-input" value={password} onChange={changePassword} />
                    <label className='login-label' htmlFor='role-input'>ROLE</label>
                    <select className='inputs-container' id="role-input" value={role} onChange={changeRole} >
                        <option id="admin" value="Admin">System Admin</option>
                        <option id="customer" value="Customer">Customer</option>
                        <option id="store owner" value="Store Owner">Store Owner</option>        
                    </select>
                    <div className="login-button-container" >
                        <button className="login-button" type="submit" >Login</button>
                        <IoMdLogIn className="login-icon"/>
                    </div>
                </form>
                <div className='login-option-text'>
                    <h3 className="login-text" >Don't have an Account! </h3>
                    <Link className='create-one' to="/">
                        <p>Create one</p>
                    </Link>
                </div>
                <div className='socials-media-container'>
                    <FaInstagram className='socialmedia-icon' />
                    <FaLinkedinIn className='socialmedia-icon'/>
                    <FaWhatsapp className='socialmedia-icon'/>
                </div>
            </div>     
            
        </div>
        
    )
}


export default Login