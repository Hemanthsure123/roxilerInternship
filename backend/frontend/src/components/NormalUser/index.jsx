import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const NormalUser= () => {
  const navigate=useNavigate()
    const onClickLogout=()=>{    
        const jwtToken=Cookies.get("jwt_token")
        Cookies.remove(jwtToken)
        navigate("/login")
    }
  return (
    <div>
        <p>Normal User</p>
        <Link to="/update">
          <button>Update Password</button>
        </Link>
        <Link to="/getstore">
          <button>View Store details</button>
        </Link>
        <button type="button" onClick={onClickLogout} >Logout</button>
    </div>
  )
}

export default NormalUser