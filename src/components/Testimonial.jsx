import React, { useEffect } from 'react'
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from 'swiper/modules'
import "swiper/css/pagination";
import { getTestimonial } from '../Redux/ActionCreators/TestimonialActionCreator';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


export default function Testimonial({ pid }) {
    let TestimonialStateData = useSelector(state => state.TestimonialStateData)
    let dispatch = useDispatch()

    let sliderOption = {
        loop: true,
        modules: [Autoplay],

        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        breakpoints: {
            640: {
                slidesPerView: 1,
                spaceBetween: 0,
            },
            768: {
                slidesPerView: 2,
                spaceBetween: 10,
            },
            1024: {
                slidesPerView: 3,
                spaceBetween: 20,
            },
        },
    }
    function getStar(star) {
        if (star === 5)
            return <><i className="bi bi-star-fill text-warning"></i><i className="bi bi-star-fill text-warning"></i><i className="bi bi-star-fill text-warning"></i><i className="bi bi-star-fill text-warning"></i></>
        else if (star === 4)
            return <><i className="bi bi-star-fill text-warning"></i><i className="bi bi-star-fill text-warning"></i><i className="bi bi-star-fill text-warning"></i><i className="bi bi-star text-warning"></i></>
        else if (star === 3)
            return <><i className="bi bi-star-fill text-warning"></i><i className="bi bi-star text-warning"></i><i className="bi bi-star-fill text-warning"></i><i className="bi bi-star text-warning"></i></>
        else if (star === 2)
            return <><i className="bi bi-star-fill text-warning"></i><i className="bi bi-star-fill text-warning"></i><i className="bi bi-star text-warning"></i><i className="bi bi-star text-warning"></i></>

        else
            return <><i className="bi bi-star-fill text-warning"></i><i className="bi bi-star-fill text-warning"></i><i className="bi bi-star-fill text-warning"></i><i className="bi bi-star text-warning"></i></>
}

    useEffect(() => {
        (() => {
            dispatch(getTestimonial())
        })()
    }, [TestimonialStateData.length])

    return (
        <>

            <div className="container-fluid py-5">
                <div className="container">
                    {
                        pid===undefined?
                        <div className="text-center mx-auto mb-5" style={{ maxwidth: " 500px" }}>
                        <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">Reviews</h5>
                        <h1 >Our Happy Customers</h1>
                        <p>Apni Shop provides amazing product quality and very fast delivery. The website is easy to use and the shopping experience is smooth. Highly recommended!Apni Shop is my favorite place for online shopping. Secure payment and fast delivery make it a trustworthy platform.</p>
                    </div>:null
                    }
                    <div className="row justify-content-center">
                        <div className="col-12">

                            <Swiper  {...sliderOption}>
                                <div className="testimonial-carousel">
                                    {
                                        TestimonialStateData.filter(x => pid ? x.product === pid : x.star >= 4).map(x => {
                                            return <SwiperSlide>
                                                <div className="testimonial-item text-center">
                                                    <div className="position-relative mb-5">
                                                        <Link className="fs-5" to={`/product/${x.product}`}>{x.pname}</Link>
                                                        <div className="text-center">
                                                            {getStar(x.star)}
                                                        </div>
                                                    </div>
                                                    <p className=" fw-normal text-justify">{x.message}</p>
                                                    <hr className="w-25 mx-auto" />
                                                    <h3>{x.username}</h3>
                                                    <h6 className="fw-normal text-primary mb-3">Profession</h6>
                                                </div>
                                            </SwiperSlide>

                                        })
                                    }
                                </div>
                            </Swiper>
                        </div>
                    </div>
                </div>
            </div>



        </>
    )
}
