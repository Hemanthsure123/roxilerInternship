import React from 'react'
import { Link,useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'

const StoreOwner= () => {
  const navigate=useNavigate()
    const onClickLogout=()=>{    
        const jwtToken=Cookies.get("jwt_token")
        Cookies.remove(jwtToken)
        navigate("/login")
    }
  return (
    <div>
      <p>Store Owner</p>
      <Link to="/update">
        <button>Update Password</button>
      </Link>
      <button type="button" onClick={onClickLogout} >Logout</button>
    </div>
  )
}

export default StoreOwner