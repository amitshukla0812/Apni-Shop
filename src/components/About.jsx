
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { getSetting } from '../Redux/ActionCreators/SettingActionCreator'
export default function About() {

    let [settingData, setSettingData] = useState({

        siteName: import.meta.env.VITE_APP_SITE_NAME,

        whatsapp: import.meta.env.VITE_APP_WHATSAPP,

        facebook: import.meta.env.VITE_APP_FACEBOOK,
        twitter: import.meta.env.VITE_APP_TWITTER,
        instagram: import.meta.env.VITE_APP_INSTAGRAM,
        youtube: import.meta.env.VITE_APP_YOUTUBE,
        linkedin: import.meta.env.VITE_APP_LINKDIN,

    })

    let SettingStateData = useSelector(state => state.SettingStateData)
    let dispatch = useDispatch()




    useEffect(() => {
        (() => {
            dispatch(getSetting())
            if (SettingStateData.length) {
                let item = SettingStateData[0]
                setSettingData({
                    siteName: item.siteName ? item.siteName : settingData.siteName,

                    whatsapp: item.whatsapp ? item.whatsapp : settingData.whatsapp,
                    instagram: item.instagram ? item.instagram : settingData.instagram,
                    youtube: item.youtube ? item.youtube : settingData.youtube,
                    linkedin: item.linkedin ? item.linkedin : settingData.linkedin,
                    facebook: item.facebook ? item.facebook : settingData.facebook,
                    twitter: item.twitter ? item.twitter : settingData.twitter,

                })
            }

        })()
    }, [SettingStateData.length])

    return (
        <>

            <div className="container-fluid py-5">
                <div className="container">
                    <div className="row gx-5">
                        <div className="col-lg-5 mb-5 mb-lg-0" style={{ minheight: "500px" }}>
                            <div className="position-relative h-100">
                                <img className="position-absolute w-100 h-100 rounded" src="images/react5.png"
                                    style={{ objectFit: "cover" }} />
                            </div>
                        </div>
                        <div className="col-lg-7">
                            <div className="mb-4">
                                <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">About Us</h5>
                                <h1 className="">Your Trusted Online Store for Quality Products at Affordable Prices</h1>
                            </div>
                            <p>{settingData.siteName} is your one-stop destination for high-quality products at prices you can trust. We are committed to providing a smooth and secure shopping experience with a wide range of items carefully selected to meet your everyday needs. Our goal is to combine affordability, reliability, and excellent customer service so that every customer feels valued and satisfied. At Apni Shop, we believe in building long-term relationships through trust, transparency, and consistent quality, making online shopping simple, convenient, and enjoyable for everyone.</p>
                            <div className="row g-3 pt-3">
                                <div className="col-sm-3 col-6">
                                    <div className="bg-light text-center rounded-circle py-4">
                                        <i className="bi bi-patch-check fs-1 text-primary mb-3"></i>
                                        <h6 className="mb-0">100%<small className="d-block text-primary">Genuine products</small></h6>
                                    </div>
                                </div>
                                <div className="col-sm-3 col-6">
                                    <div className="bg-light text-center rounded-circle py-4">
                                        <i className="bi bi-headset fs-1 text-primary mb-3"></i>
                                        <h6 className="mb-0">24/7<small className="d-block text-primary">Customer Support</small></h6>
                                    </div>
                                </div>
                                <div className="col-sm-3 col-6">
                                    <div className="bg-light text-center rounded-circle py-4">
                                        <i className="bi bi-people fs-1 text-primary mb-3"></i>
                                        <h6 className="mb-0">10000+<small className="d-block text-primary">Happy Customers</small></h6>
                                    </div>
                                </div>
                                <div className="col-sm-3 col-6">
                                    <div className="bg-light text-center rounded-circle py-4">
                                        <i className="bi bi-arrow-repeat fs-1 text-primary mb-3"></i>s
                                        <h6 className="mb-0">7 days<small className="d-block text-primary">Refund Policy</small></h6>
                                    </div>
                                </div>
                                <div className="card p-5 d-flex justift-content-center align-items-center">
                                    <div className="col-xl-3 col-6 text-center text-lg-end">
                                        <div className="d-inline-flex align-items-center">
                                            <Link className="text-body px-2" to={settingData.facebook}>
                                                <i className="fs-4 mx-2 fab fa-facebook-f"></i>
                                            </Link>
                                            <Link className="text-body px-2" to={settingData.twitter}>
                                                <i className="fs-4 mx-2 fab fa-twitter"></i>
                                            </Link>
                                            <Link className="text-body px-2" to={settingData.linkedin}>
                                                <i className="fs-4 mx-2 fab fa-linkedin-in"></i>
                                            </Link>
                                            <Link className="text-body px-2" to={settingData.instagram}>
                                                <i className="fs-4 mx-2 fab fa-instagram"></i>
                                            </Link>
                                            <Link className="text-body ps-2" to={settingData.youtube}>
                                                <i className="fs-4 mx-2 fab fa-youtube"></i>
                                            </Link>
                                        </div>
                                    </div>


                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>


        </>
    )
}
