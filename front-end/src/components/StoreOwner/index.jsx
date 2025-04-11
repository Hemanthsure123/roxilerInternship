import React from 'react'
import { Link } from 'react-router-dom'

const StoreOwner= () => {
  return (
    <div>
      <p>Store Owner</p>
      <Link to="/update">
        <button>Update Password</button>
      </Link>
    </div>
  )
}

export default StoreOwner