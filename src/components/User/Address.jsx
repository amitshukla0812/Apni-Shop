import React, { useEffect, useState } from 'react'
import FormValidator from '../../Validators/FormValidator'
import { ToastContainer, toast } from 'react-toastify'

let addressDataOption = {
  name: "",
  email: "",
  phone: "",
  address: "",
  pin: "",
  city: "",
  state: "",
}

let errorMessageOption = {
  name: "Name field is Mandatory",
  email: "Email field is Mandatory",

  phone: "Phone field is Mandatory",

  address: "Address field is Mandatory",

  city: "City field is Mandatory",

  pin: "Pin field is Mandatory",
  state: "State field is Mandatory",

}
export default function Address() {
  let [addressData, setAddressData] = useState(addressDataOption)

  let [errorMessage, setErrorMessage] = useState(errorMessageOption)

  let [show, setShow] = useState(false)

  let [data, setData] = useState({})

  let [option, setOption] = useState("Create")
  let [showModal, setShowModal] = useState(false)
  let [flag, setFlag] = useState(false)

  function getInputData(e) {
    let { name, value } = e.target
    setErrorMessage({ ...errorMessage, [name]: FormValidator(e) })
    setAddressData({ ...addressData, [name]: value })
  }



  async function postData(e) {
    e.preventDefault()
    let error = Object.values(errorMessage).find(x => x !== "")
    if (error)
      setShow(true)
    else {
      if (option === "Create")
        data.address = data.address ? data.address.concat([addressData]) : [addressData]
      else
        data.address[addressData.index]={...addressData}


      let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ ...data })
      })
      response = await response.json()
      toast("Address Record has been updated !!! ")
      setShowModal(false)
    }
    setAddressData(addressDataOption)
    setErrorMessage(errorMessageOption)
  }

  function createAddress() {
    setShowModal(true)
    setAddressData(addressDataOption)
    setErrorMessage(errorMessageOption)
    setShow(false)
    setOption("Create")
  }

  function updateAddress(index) {
    setShowModal(true)

    setAddressData({ ...data.address[index], index: index })
    setErrorMessage(addressDataOption)
    setShow(false)
    setOption("Update")
  }

  async function deleteRecord(idx) {
    if (window.confirm("Are You Sure You Want To Delete This Record?")) {
      data.address = data.address.filter((x, index) => idx !== index)
      let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
        method: "PUT",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({ ...data })
      })
      response = await response.json()
      toast("Address Record has been deleted !!! ")
      setFlag(!flag)
    }
  }

  useEffect(() => {
    (async () => {
      let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
        headers: {
          "content-type": "application/json"
        }
      })
      response = await response.json()
      setData({ ...response })
    })()
  }, [])

  return (
    <>
      <div className="mb-5">
        <button className="btn btn-primary float-end" onClick={createAddress}>Add New Address</button>
      </div>
      <div>
        {
          data?.address?.map((item, index) => {
            return <div className="card p-3" key={index}>
              <p className='text-dark'>{item.name}</p>
              <p className='text-dark'>{item.email}</p>
              <p className='text-dark'>{item.phone}</p>
              <p className='text-dark'>{item.address}</p>
              <p className='text-dark'>{item.city} , {item.pin} , {item.state}</p>

              <div className="btn-group position-absolute end-0">
                <button className="btn btn-primary" onClick={() => updateAddress(index)}>Edit</button>
                <button className="btn btn-danger" onClick={() => deleteRecord(index)}>Delete</button>
              </div>
            </div>
          })
        }
      </div>




      <div className={`modal fade ${showModal ? 'show d-block' : 'd-none'}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog" style={{ minWidth: "70vw" }}>
          <form onSubmit={postData}>

            <div className="modal-content">
              <div className="modal-header">
                <p className="modal-title" id="exampleModalLabel">{option} Address</p>
                <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
              </div>
              <div className="modal-body">
                <div className="row">

                  <div className="col-lg-4 col-12 mb-3" >
                    <label>Name*</label>
                    <input type="text" name="name" onChange={getInputData} value={addressData.name} className={`form-control ${show && errorMessage.name ? 'border-danger' : 'border-primary'}`} placeholder="Full Name" />
                    {show && errorMessage.name ? <p className="text-danger">{errorMessage.name}</p> : null}
                  </div>

                  <div className="col-lg-4 col-12 mb-3" >
                    <label>Email*</label>
                    <input type="email" name="email" onChange={getInputData} value={addressData.email} className={`form-control ${show && errorMessage.email ? 'border-danger' : 'border-primary'}`} placeholder="Email Address" />
                    {show && errorMessage.email ? <p className="text-danger">{errorMessage.email}</p> : null}
                  </div>

                  <div className="col-lg-4 col-12 mb-3" >
                    <label>Phone*</label>
                    <input type="number" name="phone" onChange={getInputData} value={addressData.phone} className={`form-control ${show && errorMessage.phone ? 'border-danger' : 'border-primary'}`} placeholder="Phone Number" />
                    {show && errorMessage.phone ? <p className="text-danger">{errorMessage.phone}</p> : null}
                  </div>

                  <div className=" col-12 mb-3" >
                    <label>Address*</label>
                    <textarea name="address" onChange={getInputData} value={addressData.address} className={`form-control ${show && errorMessage.address ? 'border-danger' : 'border-primary'}`} placeholder="Full Address" row={2} ></textarea>
                    {show && errorMessage.address ? <p className="text-danger">{errorMessage.address}</p> : null}
                  </div>

                  <div className="col-lg-4 col-12 mb-3" >
                    <label>Pin Code*</label>
                    <input type="text" name="pin" onChange={getInputData} value={addressData.pin} className={`form-control ${show && errorMessage.pin ? 'border-danger' : 'border-primary'}`} placeholder="Pin Code" />
                    {show && errorMessage.pin ? <p className="text-danger">{errorMessage.pin}</p> : null}
                  </div>

                  <div className="col-lg-4 col-12 mb-3" >
                    <label>City*</label>
                    <input type="text" name="city" onChange={getInputData} value={addressData.city} className={`form-control ${show && errorMessage.city ? 'border-danger' : 'border-primary'}`} placeholder="City Name" />
                    {show && errorMessage.city ? <p className="text-danger">{errorMessage.city}</p> : null}
                  </div>

                  <div className="col-lg-4 col-12 mb-3" >
                    <label>State*</label>
                    <input type="text" name="state" onChange={getInputData} value={addressData.state} className={`form-control ${show && errorMessage.state ? 'border-danger' : 'border-primary'}`} placeholder="State Name" />
                    {show && errorMessage.state ? <p className="text-danger">{errorMessage.state}</p> : null}
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
