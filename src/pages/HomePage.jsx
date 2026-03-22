
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, NavLink } from 'react-router-dom'
import { getSetting } from '../Redux/ActionCreators/SettingActionCreator'
import { getProduct } from '../Redux/ActionCreators/ProductActionCreator'
import { getMainCategory } from '../Redux/ActionCreators/MainCategoryActionCreator'

import About from '../components/About'
import Features from '../components/Features'
import ProductSlider from '../components/ProductSlider'
import Testimonial from '../components/Testimonial'
import Products from '../components/Products'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from 'swiper/modules'


export default function HomePage() {





    let [settingData, setSettingData] = useState({

        siteName: import.meta.env.VITE_APP_SITE_NAME,


    })

    let SettingStateData = useSelector(state => state.SettingStateData)
    let ProductStateData = useSelector(state => state.ProductStateData)
    let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
    let dispatch = useDispatch()

    let sliderOption = {
        loop: true,
        modules: [Autoplay],
        autoplay: {
            delau: 2000,
            disableOnInteraction: false,
        }
    }

    useEffect(() => {
        (() => {
            dispatch(getSetting())
            if (SettingStateData.length) {
                let item = SettingStateData[0]
                setSettingData({
                    siteName: item.siteName ? item.siteName : settingData.siteName,


                })
            }

        })()
    }, [SettingStateData.length])


    useEffect(() => {
        (() => {
            dispatch(getProduct())
        })()
    }, [ProductStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getMainCategory())
        })()
    }, [MaincategoryStateData.length])

    return (
        <>
            <Swiper  {...sliderOption} style={{ height: 550 }}>
                <SwiperSlide>

                    <div className="  mb-5 ">
                        <img src="/images/react5.png" className='my-banner-image' alt="" />

                        <div className="container py-5">
                            <div className="row justify-content-start">
                                <div className="col-lg-8 text-center text-lg-start">
                                    <h5 className="d-inline-block text-dark text-uppercase border-bottom border-5"
                                        style={{ borderColor: "rgba(256, 256, 256, .3) !important" }}>Welcome To {settingData.siteName}</h5>
                                    <h1 className="display-1 text-white mb-md-4">Style That Defines the Modern Man</h1>
                                    <div className="pt-2">
                                        <Link to="/shop?mc=Male" className="btn btn-info rounded-pill py-md-3 px-md-5 mx-2">Shop Now</Link>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>

                    <div className="  mb-5 ">
                        <img src="/images/react4.png" className='my-banner-image' alt="" />

                        <div className="container py-5">
                            <div className="row justify-content-start">
                                <div className="col-lg-8 text-center text-lg-start">
                                    <h5 className="d-inline-block text-dark text-uppercase border-bottom border-5"
                                        style={{ borderColor: "rgba(256, 256, 256, .3) !important" }}>Welcome To {settingData.siteName}</h5>
                                    <h1 className="display-1 text-white mb-md-4">Style That Defines the Modern Man</h1>
                                    <div className="pt-2">
                                        <Link to="/shop?mc=Male" className="btn btn-info rounded-pill py-md-3 px-md-5 mx-2">Shop Now</Link>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>

                    <div className="  mb-5 ">
                        <img src="/images/react3.png" className='my-banner-image' alt="" />

                        <div className="container py-5">
                            <div className="row justify-content-start">
                                <div className="col-lg-8 text-center text-lg-start">
                                    <h5 className="d-inline-block text-dark text-uppercase border-bottom border-5"
                                        style={{ borderColor: "rgba(256, 256, 256, .3) !important" }}>Welcome To {settingData.siteName}</h5>
                                    <h1 className="display-1 text-white mb-md-4">Style That Defines the Modern Man</h1>
                                    <div className="pt-2">
                                        <Link to="/shop?mc=Male" className="btn btn-info rounded-pill py-md-3 px-md-5 mx-2">Shop Now</Link>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>

                    <div className="  mb-5 ">
                        <img src="/images/react2.png" className='my-banner-image' alt="" />

                        <div className="container py-5">
                            <div className="row justify-content-start">
                                <div className="col-lg-8 text-center text-lg-start">
                                    <h5 className="d-inline-block text-dark text-uppercase border-bottom border-5"
                                        style={{ borderColor: "rgba(256, 256, 256, .3) !important" }}>Welcome To {settingData.siteName}</h5>
                                    <h1 className="display-1 text-white mb-md-4">Style That Defines the Modern Man</h1>
                                    <div className="pt-2">
                                        <Link to="/shop?mc=Male" className="btn btn-info rounded-pill py-md-3 px-md-5 mx-2">Shop Now</Link>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>

                    <div className="  mb-5 ">
                        <img src="/images/react1.png" className='my-banner-image' alt="" />

                        <div className="container py-5">
                            <div className="row justify-content-start">
                                <div className="col-lg-8 text-center text-lg-start">
                                    <h5 className="d-inline-block text-dark text-uppercase border-bottom border-5"
                                        style={{ borderColor: "rgba(256, 256, 256, .3) !important" }}>Welcome To {settingData.siteName}</h5>
                                    <h1 className="display-1 text-white mb-md-4">Style That Defines the Modern Man</h1>
                                    <div className="pt-2">
                                        <Link to="/shop?mc=Male" className="btn btn-info rounded-pill py-md-3 px-md-5 mx-2">Shop Now</Link>

                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </SwiperSlide>


            </Swiper>

            <About />

            {
                MaincategoryStateData.filter(x => x.status).map((item) => {
                    let data = ProductStateData.filter(x => x.maincategory === item.name)
                    if (data.length)
                        return <ProductSlider key={item.id} maincategory={item.name} data={data} />

                })
            }
            <Features />
            <Products maincategory={MaincategoryStateData.filter(x => x.status)} data={ProductStateData.filter(x => x.status)} />
            <Testimonial />

        </>
    )
}
