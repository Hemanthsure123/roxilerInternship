import React from 'react'
import { Link } from 'react-router-dom'

const NormalUser= () => {
  return (
    <div>
        <p>Normal User</p>
        <Link to="/update">
          <button>Update Password</button>
        </Link>
    </div>
  )
}

export default NormalUser