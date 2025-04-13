import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { IoMdLogIn } from "react-icons/io";
import { useState } from 'react'
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa6";
import { FaWhatsapp } from "react-icons/fa6";
import axios from 'axios'
import Cookies from 'js-cookie'


const Update = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [oldpassword,setOldPassword]=useState("")

    const changeEmail = (event) => {
        setEmail(event.target.value)
    }

    const changePassword = (event) => {
        setPassword(event.target.value)
    }

    const changeoldPassword=(event)=>{
        setOldPassword(event.target.value)
    }

    

    const navigate=useNavigate()
    const handleUpdateSubmit =  (event) => {
        event.preventDefault()
        const values = {  email: email,password:password,oldpassword:oldpassword}
        const url="https://roxilerinternship.onrender.com/update"
        axios.put(url,values)
        .then(response=>{ 
          console.log(response)
          if(response.data.Status==="Success"){
            alert(`Your password for email ${email} has been updated successfully`)
          }
          navigate("/")
          
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
                    <h1 className="register-text" >Update</h1>
                </div>
                <form className='login-container' onSubmit={handleUpdateSubmit} >
                    <label className='login-label' htmlFor='email-input'>EMAIL</label>
                    <input required type="email" className='input-container' placeholder='ENTER EMAIL' id="email-input" value={email} onChange={changeEmail} />
                    <label className='login-label' htmlFor='old-password-input'>OLD PASSWORD</label>
                    <input required type="password" className='input-container' placeholder='ENTER OLD PASSWORD' id="old-password-input" value={oldpassword} onChange={changeoldPassword} />
                    <label className='login-label' htmlFor='password-input'>NEW PASSWORD</label>
                    <input required type="password" className='input-container' placeholder='ENTER NEW PASSWORD' id="password-input" value={password} onChange={changePassword} />
                    <div className="login-button-container" >
                        <button className="login-button" type="submit" >Update</button>
                        <IoMdLogIn className="login-icon"/>
                    </div>
                </form>
                <div className='socials-media-container'>
                    <FaInstagram className='socialmedia-icon' />
                    <FaLinkedinIn className='socialmedia-icon'/>
                    <FaWhatsapp className='socialmedia-icon'/>
                </div>
            </div>     
            
        </div>
        
    )
}


export default Update