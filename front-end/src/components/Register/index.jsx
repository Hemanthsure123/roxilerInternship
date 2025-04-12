import React from 'react'
import './index.css'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdLogIn } from "react-icons/io";
import { useState } from 'react'
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";
import axios from 'axios'



const Register = () => {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [role, setRole] = useState("Admin")
    const [address, setAddress] = useState("")

    const changeAddress = (event) => {
        setAddress(event.target.value)
    }

    const changePassword = (event) => {
        setPassword(event.target.value)
    }

    const changeRole = (event) => {
        setRole(event.target.value)
    }

    const changeUsername = (event) => {
        setUsername(event.target.value)
    }

    const changeEmail = (event) => {
        setEmail(event.target.value)
    }



    const navigate=useNavigate()
    const handleRegisterSubmit =  (event) => {
        event.preventDefault()
        const values = { name: username, email: email, password: password, address: address, role: role }
        const url="http://localhost:3000/register"
        axios.post(url,values)
        .then(response=>{
          console.log(response.data.Status)
          navigate("/login")
        })
        .catch(error=>{
          console.log(error.response.data.Error)
          alert(error.response.data.Error)
        })

        

    }

    return (

        <div className="register-container">
          <img src="https://res.cloudinary.com/darsfmavs/image/upload/v1744136162/3094352-removebg-preview_ezykb0.png" alt="USER LOGIN" className='login-png' />
          <div className="registers-card">
            <div className='login-text-animation'>
              <h1 className="registers-text" >Register</h1>
            </div>
            <form className='login-container' onSubmit={handleRegisterSubmit} >
              <label className='logins-label' htmlFor='user-input'>USERNAME</label>
              <input required type="text" placeholder='USERNAME' id="user-input" className='inputs-container' value={username} onChange={changeUsername} />
              <label className='logins-label' htmlFor='email-input'>EMAIL</label>
              <input required type="email" className='inputs-container' placeholder='ENTER EMAIL' id="email-input" value={email} onChange={changeEmail} />
              <label className='logins-label' htmlFor='password-input'>PASSWORD</label>
              <input required type="password" className='inputs-container' placeholder='ENTER PASSWORD' id="password-input" value={password} onChange={changePassword} />
              <label className='logins-label' htmlFor='address-input'>ADDRESS</label>
              <textarea required rows={5} cols={5} className='address-input' id="address-input" value={address} onChange={changeAddress} placeholder='ENTER ADDRESS'/>
              <label className='logins-label' htmlFor='role-input'>ROLE</label>
              <select className='inputs-container' id="role-input" value={role} onChange={changeRole} >
                <option id="customer" value="Customer">Customer</option>
                <option id="store owner" value="Store Owner">Store Owner</option>        
              </select>
              <div className="logins-button-container" >
                <button className="login-button" type="submit" >Register</button>
                <IoMdLogIn className="login-icon"/>
              </div>
            </form>
            <div className='login-option-text'>
              <h3 className="login-text" >Already have an account! </h3>
              <Link className='create-one' to="/login">
                <p>Login</p>
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


export default Register