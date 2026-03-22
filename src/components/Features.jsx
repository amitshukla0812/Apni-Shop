import React, { useEffect, useState } from 'react'
import { getFeature } from '../Redux/ActionCreators/FeatureActionCreator'
import { useDispatch, useSelector } from 'react-redux'
export default function Features() {

    let FeatureStateData = useSelector(state => state.FeatureStateData)
    let dispatch = useDispatch()


    useEffect(() => {
        (() => dispatch(getFeature()))()
    }, [FeatureStateData.length])
    return (
        <>


            <div className="container-fluid py-5">
                <div className="container">
                    <div className="text-center mx-auto mb-5" style={{ maxwidth: " 500px" }}>
                        <h5 className="d-inline-block text-primary text-uppercase border-bottom border-5">Feature</h5>
                        <h1 >Our Features Designed for a better Shopping Experience</h1>
                        <p>Our platform offers a wide range of quality products at affordable prices, ensuring value for every customer. We provide a user-friendly interface that makes browsing and purchasing simple and convenient. Secure payment options protect your transactions, while fast and reliable delivery ensures your orders reach you on time. With dedicated customer support and regular product updates, Apni Shop is committed to making your shopping experience easy, safe, and satisfying.</p>
                    </div>
                    <div className="row g-5">
                        {
                            FeatureStateData.filter(x => x.status).map(item => {
                                return <div key={item.id} className="col-lg-4 col-md-6">
                                    <div
                                        className="service-item bg-light rounded d-flex flex-column align-items-center justify-content-center text-center">
                                        <div className="service-icon mb-4">
                                          <span className='text-light fs-1' dangerouslySetInnerHTML={{__html:item.icon}}></span>
                                        </div>
                                        <h4 className="mb-3">{item.name}</h4>
                                        <p className="m-0">{item.shortDescription}</p>
                                        
                                    </div>
                                </div>

                            })

                        }
                    </div>
                </div>
            </div>

        </>
    )
}
