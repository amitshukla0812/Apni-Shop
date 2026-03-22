import React, { useEffect, useRef, useState } from 'react'
import AdminSidebar from '../../../components/Admin/AdminSidebar'
import { Link, useNavigate } from 'react-router-dom'
import FormValidator from '../../../Validators/FormValidator'
import ImageValidator from '../../../Validators/ImageValidator'

import { createProduct } from '../../../Redux/ActionCreators/ProductActionCreator'
import { useDispatch, useSelector } from 'react-redux'

import { getMainCategory } from '../../../Redux/ActionCreators/MainCategoryActionCreator'
import { getSubCategory } from '../../../Redux/ActionCreators/SubCategoryActionCreator'
import { getBrand } from '../../../Redux/ActionCreators/BrandActionCreator'


let colors = ["White", "Black", "Blue", "Pink", "Violet", "Green", "Red", "Yellow", "Navy", "Gray", "Orange", "Lavender", "N/A"]
let sizes = ["XXXL", "XXL", "XL", "L", "M", "SM", "XS", "NB", "26", "28", "30", "32", "34", "36", "38", "40", "42", "N/A"]

var rte;
export default function AdminProductCreatePage() {

  var refdiv = useRef(null);

  let [data, setData] = useState({
    name: "",
    maincategory: "",
    subcategory: "",
    brand: "",
    color: [],
    size: [],
    basePrice: 0,
    discount: 0,

    stock: true,
    stockQuantity: 0,
    pic: [],
    status: true,

  });

  let [errorMessage, setErrorMessage] = useState({
    name: "Name is required",
    color: "Please select atleast one color ",
    size: "Please select atleast one size",
    basePrice: "BasePrice is required",
    discount: "discount is required",

    stockQuantity: "stockQuantity is required",
    pic: "Pic is required",
  });

  let [show, setShow] = useState(false);

  let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
  let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
  let BrandStateData = useSelector(state => state.BrandStateData)
  let dispatch = useDispatch()

  let navigate = useNavigate();

  function getInputData(e) {
    let name = e.target.name;
    let value =
      name === "pic" ? Array.from(e.target.files).map(x => "product/" + x.name) : e.target.value;

    setData({
      ...data,
      [name]: name === "status" || name === "stock" ? (value === "1" ? true : false) : value,
    });

    setErrorMessage({
      ...errorMessage, [name]: name === "pic" ? ImageValidator(e) : FormValidator(e)  })
  }

  function getCheckboxdata(key, value) {
    let arr = key === "color" ? data.color : data.size

    if (arr.includes(value))
      arr = arr.filter(x => x !== value)
    else
      arr.push(value)

    setErrorMessage({ ...errorMessage, [key]: arr.length ? "" : `Please select altleast one ${key}` })
    setData({ ...data, [key]: arr })
  }



  function postData(e) {
    e.preventDefault();
    let error = Object.values(errorMessage).find((x) => x !== "");
    if (error) {
      setShow(true);
    }

    else {
      let bp = parseInt(data.basePrice)
      let d = parseInt(data.discount)
      let fp = parseInt(bp - bp * d / 100)
      let sc = parseInt(data.stockQuantity)
      dispatch(createProduct({
        ...data,
        maincategory: data.maincategory ? data.maincategory : MaincategoryStateData[0].name,
        subcategory: data.subcategory ? data.subcategory : SubcategoryStateData[0].name,
        brand: data.brand ? data.brand : BrandStateData[0].name,
        basePrice: bp,
        discount: d,
        finalPrice: fp,
        stockQuantity: sc,
        description: rte.getHTMLCode()
      }))
      navigate("/admin/product");
    }
  }

  useEffect(() => {

    rte = new window.RichTextEditor(refdiv.current);
    rte.setHTMLCode("")

  })



  useEffect(() => {
    (() => {
      dispatch(getMainCategory())
    })()
  }, [MaincategoryStateData.length])

  useEffect(() => {
    (() => {
      dispatch(getSubCategory())
    })()
  }, [SubcategoryStateData.length])


  useEffect(() => {
    (() => {
      dispatch(getBrand())
    })()
  }, [BrandStateData.length])


  return (
    <div className="container-fluid my-3">
      <div className="row">
        <div className="col-lg-3">
          <AdminSidebar />
        </div>
        <div className="col-lg-9">
          <h5 className="bg-primary text-center p-2 text-light">
            Create Product
            <Link to="/admin/product">
              <i className="bi bi-arrow-left text-light fs-4 float-end"></i>
            </Link>
          </h5>
          <form onSubmit={postData}>
            <div className="row">
              <div className="col-12 mb-3">
                <label>Name*</label>
                <input type="text" name="name" onChange={getInputData} placeholder="Product Name"
                  className={`form-control ${show && errorMessage.name ? "border-danger" : "border-primary"}`} />
                {show && errorMessage.name ? (<p className="text-danger">{errorMessage.name}</p>) : null}
              </div>

              <div className="col-md-3 mb-3">
                <label>MainCategory*</label>
                <select name="maincategory" className="form-select border-primary">
                  {
                    MaincategoryStateData.filter(x => x.status).map(item => {
                      return <option key={item.id} >{item.name}</option>
                      // return <option key={item.id} value={item.id} >{item.name}</option>
                    })

                  }
                </select>
              </div>


              <div className="col-md-3 mb-3">
                <label>SubCategory*</label>
                <select name="subcategory" className="form-select border-primary">
                  {
                    SubcategoryStateData.filter(x => x.status).map(item => {
                      return <option key={item.id} >{item.name}</option>
                      // return <option key={item.id} value={item.id} >{item.name}</option>
                    })

                  }
                </select>
              </div>

              <div className="col-md-3 mb-3">
                <label>Brand*</label>
                <select name="brand" className="form-select border-primary">
                  {
                    BrandStateData.filter(x => x.status).map(item => {
                      return <option key={item.id} >{item.name}</option>
                      // return <option key={item.id} value={item.id} >{item.name}</option>
                    })

                  }
                </select>
              </div>

              <div className="col-md-3 mb-3">
                <label>Stock*</label>
                <select name="brand" className="form-select border-primary">
                  <option value="1">In Stock</option>
                  <option value="0">Out of Stock</option>
                </select>
              </div>

              <div className="col-12 mb-3">
                <label>Color*</label>
                <div className="row border border-primary p-2 m-1 rounded">
                  {colors.map((item, index) => {
                    return <div key={index} className="col-xl-2 col-lg-3 col-md-4  col-6">
                      <input type="checkbox" onChange={() => getCheckboxdata('color', item)} checked={data.color.includes(item)} name={item} />
                      <label className="ms-2">{item}</label>
                    </div>

                  })}

                </div>
              </div>
              {show && errorMessage.color ? (<p className="text-danger">{errorMessage.color}</p>) : null}

              <div className="col-12 mb-3">
                <label>Size*</label>
                <div className="row border border-primary p-2 m-1 rounded">
                  {sizes.map((item, index) => {
                    return <div key={index} className="col-xl-2 col-lg-3 col-md-4  col-6">
                      <input type="checkbox" onChange={() => getCheckboxdata('size', item)} checked={data.size.includes(item)} name={item} />
                      <label className="ms-2">{item}</label>
                    </div>

                  })}

                </div>
              </div>
              {show && errorMessage.size ? (<p className="text-danger">{errorMessage.size}</p>) : null}

              <div className="col-md-4 mb-3">
                <label>BasePrice*</label>
                <input type="number" name="basePrice" onChange={getInputData} placeholder="Product Base Price"
                  className={`form-control ${show && errorMessage.basePrice ? "border-danger" : "border-primary"}`} />
                {show && errorMessage.basePrice ? (<p className="text-danger">{errorMessage.basePrice}</p>) : null}
              </div>

              <div className="col-md-4 mb-3">
                <label>Discount *</label>
                <input type="number" name="discount" onChange={getInputData} placeholder="Product Discount"
                  className={`form-control ${show && errorMessage.discount ? "border-danger" : "border-primary"}`} />
                {show && errorMessage.discount ? (<p className="text-danger">{errorMessage.discount}</p>) : null}
              </div>


              <div className="col-12 mb-3">
                <label>Description*</label>
                <div ref={refdiv} className="border border-primary"></div>
              </div>

              <div className="col-md-6 mb-3">
                <label>Stock Quantity*</label>
                <input type="number" name="stockQuantity" onChange={getInputData} placeholder="Product Stock Quantity"
                  className={`form-control ${show && errorMessage.basePrice ? "border-danger" : "border-primary"}`} />
                {show && errorMessage.stockQuantity ? (<p className="text-danger">{errorMessage.stockQuantity}</p>) : null}
              </div>


              <div className="col-lg-6 mb-3">
                <label>Pic*</label>
                <input type="file" name="pic" multiple onChange={getInputData}
                  className={`form-control ${show && errorMessage.pic ? "border-danger" : "border-primary"}`} />
                {show && errorMessage.pic ? errorMessage.pic?.split(".").map((err, index) => {
                  return <p className='text-danger' key={index}>{err}</p>

                })

                  : null}
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
                <button type="submit" className="btn btn-primary w-100">
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
