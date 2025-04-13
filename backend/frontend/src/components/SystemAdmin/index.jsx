import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import GetStore from '../GetStore'
import GetUsers from '../GetUsers'

import './index.css'



const SystemAdmin=()=>{
    const navigate=useNavigate()
    const onClickLogout=()=>{    
        const jwtToken=Cookies.get("jwt_token")
        Cookies.remove(jwtToken)
        navigate("/login")
    }
    const jwtToken=Cookies.get("jwt_token")
    if(jwtToken===undefined){
        navigate("/login")
    }

        return(
            <div className='system-details' >
                <h1 className='system-heading'>System Administrator</h1>
                <p className='role'>All Feautures of Admin</p>
                <Link to="/update" className='update-password' >
                    <button className='functional-button' >Update Password</button>
                </Link>
                <button type="button" onClick={onClickLogout} className='logout-button' >Logout</button>
                <Link to="/addstore" className='update-password' >
                    <button className='functional-button'>Add and view new stores</button>
                </Link>
                <Link to="/getuser" className='update-password'>
                    <button className='functional-button'>View user details</button>
                </Link>    
            </div>
        )
}

export default SystemAdmin