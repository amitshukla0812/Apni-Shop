import React, { useEffect, useState } from 'react'

import FormValidator from '../../Validators/FormValidator'

export default function UpdateProfile({setOption}) {


  let [data, setData] = useState({

     name: "",
    username: "",
    email: "",
    phone: ""


  })

  let [errormessage, setErrorMessage] = useState({

    name: "",
    username: "",
    email: "",
    phone: ""


  })
  let [show, setShow] = useState(false)

  function getInputData(e) {
    let { name, value } = e.target
    setData({ ...data, [name]: value })
    setErrorMessage({ ...errormessage, [name]: FormValidator(e) })
  }

  async function postData(e) {
    e.preventDefault()
    let error = Object.values(errormessage).find(x => x !== "")
    if (error)
      setShow(true)
    else {
      let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user`)
      response = await response.json()



      let item = response.find(x =>x.id!==data.id && x.username.toLocaleLowerCase() === data.username.toLocaleLowerCase() || x.email.toLocaleLowerCase() === data.email.toLocaleLowerCase())
      if (item) {
        setShow(true)
        setErrorMessage({
          ...errormessage,
          username: item.username.toLocaleLowerCase() === data.username.toLocaleLowerCase() ? " Username already taken" : "",
          email: item.email.toLocaleLowerCase() === data.email.toLocaleLowerCase() ? "Email already taken" : "",
        })
      }
      else {
        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user/${localStorage.getItem("userid")}`, {
          method: "PUT",
          headers: {
            "content-type": "application/json"
          },
          body: JSON.stringify({ ...data })
        })
        response = await response.json()
        if (response)
          setOption("Profile")
        else
          alert("Something went wrong ")
      }
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
      setData({...data, ...response })
    })()
  }, [])

  return (
    <form onSubmit={postData}>
      <div className="row">
        <div className="col-lg-6 mb-3 ">
          <label>Name*</label>
          <input type="text" name="name" value={data.name} onChange={getInputData} placeholder="full name" className={`form-control ${show && errormessage.name ? 'border-danger' : 'border-primary'}`} />
          {show && errormessage.name ? <p className="text-danger">{errormessage.name}</p> : null}
        </div>
        <div className="col-lg-6 mb-3 ">
          <label>Phone*</label>
          <input type="text" name="phone" value={data.phone} onChange={getInputData} placeholder="full phone" className={`form-control ${show && errormessage.phone ? 'border-danger' : 'border-primary'}`} />
          {show && errormessage.phone ? <p className="text-danger">{errormessage.phone}</p> : null}
        </div>
        <div className="col-lg-6 mb-3 ">
          <label>UserName*</label>
          <input type="text" name="username" value={data.username} onChange={getInputData} placeholder=" Username" className={`form-control ${show && errormessage.username ? 'border-danger' : 'border-primary'}`} />
          {show && errormessage.username ? <p className="text-danger">{errormessage.username}</p> : null}
        </div>
        <div className="col-lg-6 mb-3 ">
          <label>Email*</label>
          <input type="email" name="email" value={data.email} onChange={getInputData} placeholder=" Email Address" className={`form-control ${show && errormessage.email ? 'border-danger' : 'border-primary'}`} />
          {show && errormessage.email ? <p className="text-danger">{errormessage.email}</p> : null}
        </div>
        
       

        <div className="col-12 mb-3">
          <button type="submit" className="btn btn-primary w-100">Update</button>
        </div>
      </div>

    </form>


  )
}
