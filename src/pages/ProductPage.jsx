import React, { useEffect, useState } from 'react'
import { getProduct } from "../Redux/ActionCreators/ProductActionCreator"
import { getCart, createCart } from "../Redux/ActionCreators/CartActionCreator"
import { getWishlist, createWishlist } from "../Redux/ActionCreators/WishlistActionCreator"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import { getTestimonial } from "../Redux/ActionCreators/TestimonialActionCreator"
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Pagination } from 'swiper/modules'
import "swiper/css/pagination";
import ProductSlider from '../components/ProductSlider';
import Testimonial from '../components/Testimonial'


export default function ProductPage() {

    let [selected, setSelected] = useState({
        color: "",
        size: "",
        qty: 1
    })

    let { id } = useParams()
    let [data, setData] = useState({})
    let [relatedProduts, setRelatedProducts] = useState([])
    let [reviewState, setReviewState] = useState({
        rating: 0,
        star: [0, 0, 0, 0, 0],
        total: 0
    })
    let [show, setShow] = useState("Description")

    let ProductStateData = useSelector(state => state.ProductStateData)
    let CartStateData = useSelector(state => state.CartStateData)
    let WishlistStateData = useSelector(state => state.WishlistStateData)
    let dispatch = useDispatch()
    let navigate = useNavigate()
    let TestimonialStateData = useSelector(state => state.TestimonialStateData)


    let sliderOption = {
        loop: true,
        modules: [Autoplay, Pagination],
        pagination: {
            clickable: true,

        },
        autoplay: {
            delau: 2000,
            disableOnInteraction: false,
        }
    }

    function addToCart() {
        let item = CartStateData.find(x => x.user === localStorage.getItem("userid") && x.product === id)
        if (!item) {
            item = {
                user: localStorage.getItem("userid"),
                product: id,
                color: selected.color,
                size: selected.size,
                qty: selected.qty,
                total: selected.qty * data.finalPrice,


                // Remove following lines in case of real backened
                name: data.name,
                brand: data.brand,
                stockQuantity: data.stockQuantity,
                price: data.finalPrice,
                pic: data.pic[0]

            }
            dispatch(createCart(item))
        }
        navigate("/cart")
    }


    function addToWishlist() {
        let item = WishlistStateData.find(x => x.user === localStorage.getItem("userid") && x.product === id)
        if (!item) {
            item = {
                user: localStorage.getItem("userid"),
                product: id,

                // Remove following lines in case of real backened
                name: data.name,
                brand: data.brand,
                color: data.color,
                size: data.size,
                stockQuantity: data.stockQuantity,
                price: data.finalPrice,
                pic: data.pic[0]

            }
            dispatch(createWishlist(item))
        }
        navigate("/profile?option=Wishlist")
    }


  useEffect(() => {
        (() => {
            dispatch(getProduct())
            if (ProductStateData.length) {
                let item = ProductStateData.find(x => x.id === id)
                if (item) {
                    setData(item)
                    setSelected({
                        ...selected,
                        color: item.color[0],
                        size: item.size[0]
                    })
                    setRelatedProducts(ProductStateData.filter(x => x.maincategory === item.maincategory))
                }
                else
                    window.history.back()
            }
        })()
    }, [ProductStateData.length, id])

    useEffect(() => {
        (() => {
            dispatch(getCart())
        })()
    }, [CartStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getWishlist())
        })()
    }, [WishlistStateData.length])

    useEffect(() => {
        (() => {
            dispatch(getTestimonial())
            if (TestimonialStateData.length) {
                let reviews = TestimonialStateData.filter(x => x.product === id)
                let total = 0
                let star = [0, 0, 0, 0, 0]
                reviews.forEach(x => {
                    total += x.star,
                        star[x.star - 1] += 1
                })
                setReviewState({
                    rating: (total/reviews.length).toFixed(1),
                    star: star,
                    total: reviews.length
                })
            }

        })()
    }, [TestimonialStateData.length, id])
    return (
        <div className="container my-3">
            <div className="row">
                <div className="col-md-6">
                    <Swiper  {...sliderOption}>
                        {
                            data?.pic?.map((item, index) => {
                                return <SwiperSlide key={index}>
                                    <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item}`} height={400} className="w-100" />
                                </SwiperSlide>

                            })
                        }
                    </Swiper>

                </div>
                <div className="col-md-6">
                    <h5 className="bg-primary mt-2 text-center text-light">{data.name ?? ""}</h5>
                    <table className="table table-borderd">

                        <tbody>
                            <tr>
                                <th>maincategory</th>
                                <td>{data.maincategory}</td>
                            </tr>
                            <tr>
                                <th>Subcategory</th>
                                <td>{data.subcategory}</td>
                            </tr>
                            <tr>
                                <th>Brand</th>
                                <td>{data.brand}</td>
                            </tr>
                            <tr>
                                <th>Color</th>
                                <td>{
                                    data?.color?.map((item, index) => {
                                        return <button key={index} onClick={() => setSelected({ ...selected, color: item })} className={`btn ${selected.color === item ? 'btn-primary' : 'btn-light'}`}>{item}</button>
                                    })
                                }</td>
                            </tr>
                            <tr>
                                <th>Size</th>
                                <td>{
                                    data?.size?.map((item, index) => {
                                        return <button key={index} onClick={() => setSelected({ ...selected, size: item })} className={`btn ${selected.size === item ? 'btn-primary' : 'btn-light'}`}>{item}</button>
                                    })
                                }</td>
                            </tr>
                            <tr>
                                <th>Price</th>
                                <td><del>&#8377;{data.basePrice}</del> &#8377;{data.finalPrice}<sup>{data.discount}%off</sup></td>
                            </tr>
                            <tr>
                                <th>Stock</th>
                                <td>{data.Stock ? `${data.stockQuantity} Left in Stock` : 'Out of Stock'}</td>
                            </tr>
                            <tr>
                                <td colSpan={2}>
                                    {
                                        data.stock ?
                                            <div className="row">
                                                <div className="col-md-4">
                                                    <div className="btn-group w-100">
                                                        <button className="btn btn-primary" onClick={() => selected.qty > 1 ? setSelected({ ...selected, qty: selected.qty - 1 }) : null}><i className="bi bi-dash"></i></button>
                                                        <h5 className="w-25 text-center">{selected.qty}</h5>
                                                        <button className="btn btn-primary" onClick={() => selected.qty < data.stockQuantity ? setSelected({ ...selected, qty: selected.qty + 1 }) : null}><i className="bi bi-plus"></i></button>
                                                    </div>
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="btn-group w-100">
                                                        <button className="btn btn-primary" onClick={addToCart}><i className="bi bi-cart-check"></i>Add to Cart</button>
                                                        <button className="btn btn-primary" onClick={addToWishlist}><i className="bi bi-heart"></i>Add to Wishlist</button>
                                                    </div>
                                                </div>
                                            </div> :
                                            <button className="btn btn-primary" onClick={addToWishlist}><i className="bi bi-heart"></i>Add to Wishlist</button>
                                    }
                                </td>

                            </tr>
                            {/* <tr>
                                <th>Description</th>
                                <td><div dangerouslySetInnerHTML={{ __html: data.description }}></div></td>
                            </tr> */}
                        </tbody>
                    </table>
                </div>
            </div>

            <ul className="nav nav-tabs my-3">
                <li className="nav-item">
                    <button className={`nav-link ${show === "Description" ? 'active' : ''}`} onClick={() => setShow("Description")} >Description</button>
                </li>
                <li className="nav-item">
                    <button className={`nav-link ${show === "Reviews" ? 'active' : ''}`} onClick={() => setShow("Reviews")} >Reviews</button>
                </li>

            </ul>
            <div className={`${show === "Description" ? 'd-block' : 'd-none'}`}>
                <div className='card p-4' dangerouslySetInnerHTML={{ __html: data.description }} />
            </div>
            <div className={`${show === "Reviews" ? 'd-block' : 'd-none'}`}>
                <Testimonial pid={data.id} />
            </div>

            <div className="mt-3">
                <ProductSlider maincategory="Related Products" data={relatedProduts} />
            </div>
        </div>
    )
}
