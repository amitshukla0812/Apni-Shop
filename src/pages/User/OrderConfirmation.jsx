import React from 'react'
import { Link } from 'react-router-dom'

export default function OrderConfirmation() {
  return (
    <div className="container my-3">
<div className='card p-5 text-center'>

<h1>Thankyou</h1>
<h2>Your Order has been Placed Successfully</h2>
<h2>You can track your order in Profile page</h2>
<Link to="/shop" className="btn btn-primary w-25 m-auto mt-2">Shop</Link>
<Link to="/profile?option=Order" className="btn btn-primary w-25 m-auto mt-2">Profile</Link>
</div>
    </div>
  )
}
