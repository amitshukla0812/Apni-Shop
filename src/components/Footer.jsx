import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSetting } from '../Redux/ActionCreators/SettingActionCreator'
import { getNewslater, createNewslater } from '../Redux/ActionCreators/NewslaterActionCreator'
import { Link, NavLink } from 'react-router-dom'

export default function Footer() {

    let [settingData, setSettingData] = useState({

        siteName: import.meta.env.VITE_APP_SITE_NAME,

        address: import.meta.env.VITE_APP_ADDRESS,
        map1: import.meta.env.VITE_APP_MAP1,

        email: import.meta.env.VITE_APP_EMAIL,

        phone: import.meta.env.VITE_APP_PHONE,

        whatsapp: import.meta.env.VITE_APP_WHATSAPP,

        facebook: import.meta.env.VITE_APP_FACEBOOK,
        twitter: import.meta.env.VITE_APP_TWITTER,
        instagram: import.meta.env.VITE_APP_INSTAGRAM,
        youtube: import.meta.env.VITE_APP_YOUTUBE,
        linkedin: import.meta.env.VITE_APP_LINKDIN,

    })

    let [email, setEmail] = useState("")
    let [message, setMessage] = useState("")

    let SettingStateData = useSelector(state => state.SettingStateData)
    let NewslaterStateData = useSelector(state => state.NewslaterStateData)
    let dispatch = useDispatch()

    // function postData(e) {
    //     e.preventDefault()
    //     if (email === "" || email.length < 13)
    //         setMessage("Please enter a valid Email Address")
    //     else {
    //         let item = NewslaterStateData.find(x => x.email === email)
    //         if (item)
    //             setMessage("This Email address is already registerd with us")
    //         else {
    //             dispatch(createNewslater({ email: email, status: true }))
    //             setMessage("Thanks to Subscribe our Newsletter Services")
    //             setEmail("")
    //         }
    //     }

    // }

function postData(e) {

  e.preventDefault()

  if (email === "" || email.length < 13) {

    setMessage("Please enter a valid Email Address")

  } else {

    let item = NewslaterStateData.find(
      x => x.email.toLowerCase().trim() === email.toLowerCase().trim()
    )

    if (item) {

      setMessage("This Email address is already registered with us")

    } else {

      dispatch(createNewslater({ email: email, status: true }))

      setMessage("Thanks for subscribing to our Newsletter Services")

      setEmail("")

    }

  }

}

    useEffect(() => {
        (() => {
            dispatch(getSetting())
            if (SettingStateData.length) {
                let item = SettingStateData[0]
                setSettingData({
                    siteName: item.siteName ? item.siteName : settingData.siteName,
                    address: item.siteName ? item.address : settingData.address,
                    map1: item.map1 ? item.map1 : settingData.map1,
                    email: item.email ? item.email : settingData.email,
                    phone: item.phone ? item.phone : settingData.phone,
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

    useEffect(() => {
        (() => {
            dispatch(getNewslater())
        })()
    }, [NewslaterStateData.length])



    return (
        <>


            <div className="container-fluid bg-dark text-light mt-5 py-5">
                <div className="container py-5">
                    <div className="row g-5">
                        <div className="col-lg-4 col-md-6">
                            <Link to="/" className="fs-4 d-inline-block text-primary text-uppercase border-bottom border-5 border-secondary mb-4">
                                <i className=' bi bi-bag-check me-2'></i>{settingData.siteName}</Link>
                            <p className=" mb-4 text-justify">Apni Shop is your trusted online destination for quality products at affordable prices. We are committed to offering a smooth shopping experience with carefully selected items, secure payments, and reliable delivery. Customer satisfaction and value are at the heart of everything we do.</p>
                            <Link to={settingData.map1} target='_blank' className="d-block text-light mb-2"><i className="fa fa-map-marker-alt text-primary me-3"></i>{settingData.address}</Link>
                            <Link to={`mailto:${settingData.email}`} target='_blank' className="d-block text-light mb-2"><i className="fa fa-envelope text-primary me-3"></i>{settingData.email}</Link>
                            <Link to={`tel:${settingData.phone}`} target='_blank' className="d-block text-light mb-0"><i className="fa fa-phone-alt text-primary me-3"></i>{settingData.phone}</Link>
                            <Link to={`https://wa.me/${settingData.whatsapp}`} target='_blank' className="d-block text-light mb-0"><i className="bi bi-whatsapp text-primary me-3"></i>{settingData.whatsapp}</Link>
                        </div>

                        <div className="col-lg-3 col-md-6">
                            <h4 className="d-inline-block text-primary text-uppercase border-bottom border-5 border-secondary mb-4">
                                Popular Links</h4>
                            <div className="d-flex flex-column justify-content-start">
                                <Link className="text-light mb-2" to="/"><i className="fa fa-angle-right me-2"></i>Home</Link>
                                <Link className="text-light mb-2" to="/about"><i className="fa fa-angle-right me-2"></i>About</Link>
                                <Link className="text-light mb-2" to="/shop"><i className="fa fa-angle-right me-2"></i>Shop</Link>
                                <Link className="text-light mb-2" to="/feature"><i className="fa fa-angle-right me-2"></i>Features</Link>
                                <Link className="text-light mb-2" to="/faq"><i className="fa fa-angle-right me-2"></i>Faq</Link>
                                <Link className="text-light mb-2" to="/testimonial"><i className="fa fa-angle-right me-2"></i>Testimonial</Link>
                                <Link className="text-light mb-2" to="/contact"><i className="fa fa-angle-right me-2"></i>ContactUs</Link>
                                <Link className="text-light mb-2" to="/privacy-policy"><i className="fa fa-angle-right me-2"></i>Privacy Policy</Link>
                                <Link className="text-light mb-2" to="/terms-condtion"><i className="fa fa-angle-right me-2"></i>Terms and Condition</Link>
                                <Link className="text-light mb-2" to="/refund-policy"><i className="fa fa-angle-right me-2"></i>Refund Policy</Link>



                            </div>
                        </div>
                        <div className="col-lg-4 col-md-6">
                            <h4 className="d-inline-block text-primary text-uppercase border-bottom border-5 border-secondary mb-4">
                                Newsletter</h4>

                            <p className="text-justify">Stay updated to Apni shop Subscribe to our newsletter and be the first to know about new arrivals, exclusive deals, special offers, and updates from ApniShop—straight to your inbox.</p>
                            <form onSubmit={postData}>
                                <div className="input-group">
                                    <input type="text" name="email" value={email} onChange={(e) => setEmail(e.target.value)} className="form-control p-3 border-0" placeholder="Your Email Address" />
                                    <button className="btn btn-primary" type="submit">Subscribe</button>
                                </div>
                                {message ? <p>{message}</p> : null}
                            </form>
                            <h6 className=" mt-5 text-primary text-uppercase mt-4 mb-3">Follow Us</h6>
                            <div className="d-flex">
                                <Link className="btn btn-lg btn-primary btn-lg-square rounded-circle me-2" to={settingData.twitter} target='_blank'><i
                                    className="fab fa-twitter"></i></Link>
                                <Link className="btn btn-lg btn-primary btn-lg-square rounded-circle me-2" to={settingData.facebook} target='_blank'><i
                                    className="fab fa-facebook"></i></Link>
                                <Link className="btn btn-lg btn-primary btn-lg-square rounded-circle me-2" to={settingData.instagram} target='_blank'><i
                                    className="fab fa-instagram"></i></Link>
                                <Link className="btn btn-lg btn-primary btn-lg-square rounded-circle me-2" to={settingData.twitter} target='_blank'><i
                                    className="fab fa-twitter"></i></Link>
                                <Link className="btn btn-lg btn-primary btn-lg-square rounded-circle me-2" to={settingData.linkedin} target='_blank'><i
                                    className="fab fa-linkedin"></i></Link>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container-fluid bg-dark text-light border-top border-secondary py-4">
                <div className="container">

                    <div className=" text-center ">
                        <p className="mb-md-0">&copy; <Link className="text-primary" href="#!">{settingData.sitename}</Link>. All Rights Reserved.
                        </p>
                    </div>

                </div>
            </div>







        </>
    )
}
