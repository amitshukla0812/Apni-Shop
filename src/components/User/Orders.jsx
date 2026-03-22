import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { getCheckout } from "../../Redux/ActionCreators/CheckoutActionCreator"
import { getTestimonial, createTestimonial, updateTestimonial } from "../../Redux/ActionCreators/TestimonialActionCreator"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

let dataOption = {
  message: '',
  star: 5
}

export default function Orders() {
  let [orders, setOrders] = useState([])
  let [reviews, setReviews] = useState([])

  let [option, setOption] = useState("Create")
  let [showModal, setShowModal] = useState(false)

  let [data, setData] = useState(dataOption)

  let CheckoutStateData = useSelector(state => state.CheckoutStateData)
  let TestimonialStateData = useSelector(state => state.TestimonialStateData)
  let dispatch = useDispatch()

  //function setCreateOptions(pid)   Use this lin in case of real backend
  function setCreateOptions(pid, name) {
    setShowModal(true)
    setOption("Create")
    setData({
      ...dataOption,
      user: localStorage.getItem("userid"),
      product: pid,
      username: localStorage.getItem("name"),  // remove this line in case of real backend
      pname: name                              // remove this line in case of real backend

    })
  }

  function setUpdateOptions(pid) {
    setShowModal(true)
    setOption("Update")
    let item = reviews.find(x => x.product === pid)
    setData({ ...data, ...item })
  }

  function getInputData(e) {
    let name = e.target.name                                                        // remove this line in case of real backend
    let value = name === "star" ? parseInt(e.target.value) : e.target.value       // remove this line in case of real backend

    // let { name, value } = e.target                                             // Use this line in case of real backend
    setData({ ...data, [name]: value })
  }

  function postData(e) {
    e.preventDefault()
    if (option === "Create") {
      dispatch(createTestimonial({ ...data, date: new Date() }))
      setData({ ...dataOption })
      setShowModal(false)
      toast("Your Review has been Submitted")
      setReviews([ ...reviews, data ])
    }
    else {
      let index = reviews.findIndex(x => x.id === data.id)
      reviews[index] = { ...data }
      setReviews(reviews)
      dispatch(updateTestimonial({ ...data, date: new Date() }))
      setData({ ...dataOption })
      setShowModal(false)
      toast("Your Review has been Updated")
    }
  }


 

useEffect(() => {
    (() => {
      dispatch(getCheckout())
      if (CheckoutStateData.length) {
        let userOrders = CheckoutStateData.filter(  x => x.user === localStorage.getItem("userid"))
      
        setOrders(userOrders)                      
      }
    })()
  }, [CheckoutStateData.length])

  useEffect(() => {
    (() => {
      dispatch(getTestimonial())
      if (TestimonialStateData.length) {
        setReviews(TestimonialStateData.filter(x => x.user === localStorage.getItem("userid")))
      }
    })()

  }, [TestimonialStateData.length])


  return (
    <>
      {
        orders.length ?
          orders.map(item => {
            return <div className=" mb-3" key={item.id}>
              <div className="table-responsive ">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th>Order Id</th>
                      <th>Order Status</th>
                      <th>Payment Mode</th>
                      <th>Payment Status</th>
                      <th>Shipping</th>
                      <th>Sub Total</th>
                      <th>Total</th>
                      <th>Date</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>{item.id}</td>
                      <td>{item.orderStatus}</td>
                      <td>{item.paymentMode}</td>
                      <td>{item.paymentStatus}</td>
                      <td>&#8377;{item.subTotal}</td>
                      <td>&#8377;{item.shipping}</td>
                      <td>&#8377;{item.total}</td>
                      <td>{new Date(item.date).toDateString()}</td>
                    </tr>
                  </tbody>
                </table>


              </div>
              <h5 className="text center p-2 border border-primary">Products in this Orders</h5>
              <div className="table-responsive">
                <table className="table table-bordered">
                  <thead>
                    <tr>
                      <th></th>
                      <th>Name</th>
                      <th>Brand</th>
                      <th>Color</th>
                      <th>Size</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>
                      <th></th>
                      <th></th>

                    </tr>
                  </thead>

                  <tbody>
                    {
                      item.products?.map((p, index) => {
                        return <tr key={index}>

                          <td>
                            <Link to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${p.pic}`} target='_blank' rel='noreferrer'></Link>
                            <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${p.pic}`} height={50} width={80} atl="" />


                          </td>
                          <td>{p.name}</td>
                          <td>{p.brand}</td>
                          <td>{p.color}</td>
                          <td>{p.size}</td>
                          <td>&#8377;{p.price}</td>
                          <td>{p.qty}</td>
                          <td>&#8377;{p.total}</td>

                          <td><Link to={`/product/${p.product}`} className="btn btn-primary">Buy Again</Link></td>
                          <td>{item.orderStatus === "Order Has Been Placed" ? reviews.find(x => x.product === p.id) ? <button className="btn btn-success" onClick={() => setUpdateOptions(p.product)}>Update Review</button> : <button className="btn btn-primary" onClick={() => setCreateOptions(p.product, p.name)}>Write Review</button> : null}</td>


                        </tr>
                      })
                    }
                  </tbody>
                </table>
              </div>
            </div >
          }) :
          <div className="text-center card p-5">
            No Order history Found
            <Link to="/shop" className="btn btn-primary w-25 m-auto mt-3">Shop Now</Link>
          </div>
      }
      <div className={`modal fade ${showModal ? 'show d-block' : 'd-none'}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" style={{ minWidth: "70vw" }}>
          <form onSubmit={postData}>

            <div className="modal-content">
              <div className="modal-header">
                <p className="modal-title" id="exampleModalLabel">{option} Review</p>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row">



                  <div className=" col-12 mb-3" >
                    <label>Message*</label>
                    <textarea name="message" onChange={getInputData} value={data.message} className={`form-control  border-primary'}`} required placeholder="Write your Review" row={5} ></textarea>

                  </div>

                  <div className=" col-md-6" >
                    <label>Star*</label>
                    <select name="star" onChange={getInputData} value={data.star} className="form -select border-primary">
                      <option>5</option>
                      <option>4</option>
                      <option>3</option>
                      <option>2</option>
                      <option>1</option>

                    </select>
                  </div>

                </div>
              </div>
              <div className="modal-footer">

                <button type="submit" className="btn btn-primary">{option}</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastContainer />

    </>
  )
}


