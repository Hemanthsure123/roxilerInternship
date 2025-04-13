import React from 'react'
import Cookies from 'js-cookie'

import SystemAdmin from '../SystemAdmin'
import StoreOwner  from '../StoreOwner'
import NormalUser from '../NormalUser'

import {Component} from 'react'

const jwtToken=Cookies.get("jwt_token")
console.log(jwtToken)
const role=Cookies.get("role")
console.log(role)

class Home extends Component{

  renderSystemAdmin=()=>{
    return(
      <SystemAdmin/>
    )
  }

  renderNormalUser=()=>{
    return(
      <NormalUser/>
    )
  }


  renderStoreOwner=()=>{
    return(
      <StoreOwner/>
    )
  }

  render(){
    const role=Cookies.get("role") 
    switch (role) {
      case "Admin":
        return this.renderSystemAdmin()
      case "Customer":
        return this.renderNormalUser()
      case "Store Owner":
        return this.renderStoreOwner()
      default:
        return null
    }
    
  }
}


export default Home