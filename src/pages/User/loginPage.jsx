import React, { useState } from 'react'

import { Link, useNavigate, useNavigation } from 'react-router-dom'

export default function LoginPage() {
    let [data, setData] = useState({

        username: "",
        password: "",

    })
    let [errormessage, setErrorMessage] = useState("")
    let navigate = useNavigate("")

    function getInputData(e) {
        let { name, value } = e.target
        setData({ ...data, [name]: value })

    }

    async function postData(e) {
        e.preventDefault()

        let response = await fetch(`${import.meta.env.VITE_APP_BACKEND_SERVER}/user`, {
            headers: {
                "content-type": "application/json"
            }
        })
        response = await response.json()
        let item = response.find(x => x.username === data.username || x.email === data.username)
        if (item && item.password === data.password) {
            if (item.status === false) {
                setErrorMessage("Your account has been blocked due to some authorized activity, Please contact us to recover your account")
            } else {
                localStorage.setItem("login", true)
                localStorage.setItem("userid", item.id)
                localStorage.setItem("name", item.name)
                localStorage.setItem("role", item.role)
                if (item.role === "Buyer")
                    navigate("/profile")
                else
                    navigate("/admin")
            }
        }
        else
            setErrorMessage("Invalid username or password")

    }
    return (
        <div className="container my-3">
            <div className="row">
                <div className="col-lg-8 col-md-10 col-sm-11 m-auto">
                    <h5 className="bg-primary text-center text-light p-2">Login to Your  Account</h5>
                    <form onSubmit={postData}>
                        <div className="row">


                            <div className="col-lg-12 mb-3 ">
                                <label>UserName*</label>
                                <input type="text" name="username" onChange={getInputData} placeholder=" Username" className={`form-control ${errormessage.username ? 'border-danger' : 'border-primary'}`} />
                                {errormessage.username ? <p className="text-danger">{errormessage.username}</p> : null}
                            </div>

                            <div className="col-lg-12 mb-3 ">
                                <label>Password*</label>
                                <input type="password" name="password" onChange={getInputData} placeholder=" Password" className={`form-control ${errormessage ? 'border-danger' : 'border-primary'}`} />

                            </div>


                            <div className="col-12 mb-3">
                                <button type="submit" className="btn btn-primary w-100">login</button>
                            </div>
                        </div>

                    </form>
                    <div className="d-flex justify-content-between">
                        <Link to="#!">Forget Password ?</Link>
                        <Link to="/Signup"> Please Create a Account  ? Signup</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
