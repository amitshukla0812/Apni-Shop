import React, { useState } from 'react'
import FormValidator from '../../Validators/FormValidator'
import { Link, useNavigate, useNavigation } from 'react-router-dom'

export default function SignupPage() {
    let [data, setData] = useState({
        name: "",
        username: "",
        email: "",
        phone: "",
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
    let [show, setShow] = useState(false)
    let navigate = useNavigate("")

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

            if (data.password != data.cpassword) {
                setErrorMessage({
                    ...errormessage, password: "Password and Confirm password does't matched"

                })
                setShow(true)
                return
            }

            let item = response.find(x => x.username.toLocaleLowerCase() === data.username.toLocaleLowerCase() || x.email.toLocaleLowerCase() === data.email.toLocaleLowerCase())
            if (item) {
                setShow(true)
                setErrorMessage({
                    ...error,
                    username: item.username.toLocaleLowerCase() === data.username.toLocaleLowerCase() ? " Username already taken" : "",
                    email: item.email.toLocaleLowerCase() === data.email.toLocaleLowerCase() ? "Email already taken" : "",
                })
            }
            else {
                let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user`, {
                    method: "POST",
                    headers: {
                        "content-type": "application/json"
                    },
                    body: JSON.stringify({
                        name: data.name,
                        username: data.username,

                        email: data.email,

                        phone: data.phone,

                        password: data.password,

                        role: "Buyer",
                        status: true

                    })
                })
                response = await response.json()
                if (response)
                    navigate("/login")
                else
                    alert("Something went wrong ")
            }
        }
    }

    return (
        <div className="container my-3">
            <div className="row">
                <div className="col-lg-8 col-md-10 col-sm-11 m-auto">
                    <h5 className="bg-primary text-center text-light p-2">Create Your Free Account</h5>
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

                            <div className="col-12 mb-3">
                                <button type="submit" className="btn btn-primary w-100">Signup</button>
                            </div>
                        </div>

                    </form>
                    <Link to="/login">Already have an account ? Login</Link>
                </div>
            </div>
        </div>
    )
}
