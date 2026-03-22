import React, { useEffect, useState } from 'react'
import AdminSidebar from '../../../components/Admin/AdminSidebar'
import { Link, useNavigate } from 'react-router-dom'
import FormValidator from '../../../Validators/FormValidator'


import { getUser, createUser } from '../../../Redux/ActionCreators/UserActionCreator'
import { useDispatch, useSelector } from 'react-redux'

export default function AdminUserCreatePage() {
  let [data, setData] = useState({
    name: "",
    username: "",
    email: "",
    phone: "",
    role: "",
    password: "",
    cpassword: "",
  })
  let [errormessage, setErrorMessage] = useState({

    name: "Name field is Mandatory",
    username: "Username field is Mandatory",
    email: "Email field is Mandatory",
    phone: "Phone field is Mandatory",
    password: "Password field is Mandatory",

  })

  let [show, setShow] = useState(false);

  let UserStateData = useSelector(state => state.UserStateData)
  let dispatch = useDispatch()

  let navigate = useNavigate();

  function getInputData(e) {
    let { name, value } = e.target
    setData({
      ...data,
      [name]: name === "status" ? (value === "1" ? true : false) : value,
    });

    setErrorMessage({ ...errormessage, [name]: FormValidator(e) });
  }

   function postData(e) {
    e.preventDefault()
    let error = Object.values(errormessage).find(x => x !== "")
    if (error)
      setShow(true)
    else {
      if (data.password != data.cpassword) {
        setErrorMessage({
          ...errormessage, password: "Password and Confirm password does't matched"

        })
        setShow(true)
        return
      }

      let item = UserStateData.find(x => x.username.toLocaleLowerCase() === data.username.toLocaleLowerCase() || x.email.toLocaleLowerCase() === data.email.toLocaleLowerCase())
      if (item) {
        setShow(true)
        setErrorMessage({
          ...error,
          username: item.username.toLocaleLowerCase() === data.username.toLocaleLowerCase() ? " Username already taken" : "",
          email: item.email.toLocaleLowerCase() === data.email.toLocaleLowerCase() ? "Email already taken" : "",
        })
      }
      else {
        dispatch(createUser({...data}))
        navigate("/admin/user")
      }
    }
  }
  useEffect(() => {
    (() => {
      dispatch(getUser())

    })()
  }, [UserStateData.length])

  return (
    <div className="container-fluid my-3">
      <div className="row">
        <div className="col-lg-3">
          <AdminSidebar />
        </div>
        <div className="col-lg-9">
          <h5 className="bg-primary text-center p-2 text-light">
            Create User
            <Link to="/admin/User">
              <i className="bi bi-arrow-left text-light fs-4 float-end"></i>
            </Link>
          </h5>
          <form onSubmit={postData}>
            <div className="row">
              <div className="col-lg-6 mb-3 ">
                <label>Name*</label>
                <input type="text" name="name" onChange={getInputData} placeholder="full name" className={`form-control ${show && errormessage.name ? 'border-danger' : 'border-primary'}`} />
                {show && errormessage.name ? <p className="text-danger">{errormessage.name}</p> : null}
              </div>
              <div className="col-lg-6 mb-3 ">
                <label>Phone*</label>
                <input type="text" name="phone" onChange={getInputData} placeholder="full phone" className={`form-control ${show && errormessage.phone ? 'border-danger' : 'border-primary'}`} />
                {show && errormessage.phone ? <p className="text-danger">{errormessage.phone}</p> : null}
              </div>
              <div className="col-lg-6 mb-3 ">
                <label>UserName*</label>
                <input type="text" name="username" onChange={getInputData} placeholder=" Username" className={`form-control ${show && errormessage.username ? 'border-danger' : 'border-primary'}`} />
                {show && errormessage.username ? <p className="text-danger">{errormessage.username}</p> : null}
              </div>
              <div className="col-lg-6 mb-3 ">
                <label>Email*</label>
                <input type="email" name="email" onChange={getInputData} placeholder=" Email Address" className={`form-control ${show && errormessage.email ? 'border-danger' : 'border-primary'}`} />
                {show && errormessage.email ? <p className="text-danger">{errormessage.email}</p> : null}
              </div>
              <div className="col-lg-6 mb-3 ">
                <label>Password*</label>
                <input type="password" name="password" onChange={getInputData} placeholder=" Password" className={`form-control ${show && errormessage.password ? 'border-danger' : 'border-primary'}`} />
                {show && errormessage.password ? <p className="text-danger">{errormessage.password}</p> : null}
              </div>
              <div className="col-lg-6 mb-3 ">
                <label>Confirm Password*</label>
                <input type="password" name="cpassword" onChange={getInputData} placeholder=" Confirm Password" className={`form-control ${show && errormessage.password ? 'border-danger' : 'border-primary'}`} />

              </div>
              <div className="col-lg-6 mb-3">
                <label>Role*</label>
                <select
                  name="role"
                  onChange={getInputData}
                  className="form-select border-primary"
                >
                  <option>Admin</option>
                  <option >Super Admin</option>
                </select>
              </div>
              <div className="col-lg-6 mb-3">
                <label>Status*</label>
                <select
                  name="status"
                  onChange={getInputData}
                  className="form-select border-primary"
                >
                  <option value="1">Active</option>
                  <option value="0">Inactive</option>
                </select>
              </div>
              <div className="col-12 mb-3">
                <button type="submit" className="btn btn-primary w-100">Signup</button>
              </div>
            </div>

          </form>
        </div>
      </div >
    </div >
  );
}
