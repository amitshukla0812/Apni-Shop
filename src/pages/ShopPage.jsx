import React, { useEffect, useState } from 'react'
import { getMainCategory } from "../Redux/ActionCreators/MainCategoryActionCreator"
import { getSubCategory } from "../Redux/ActionCreators/SubCategoryActionCreator"
import { getBrand } from "../Redux/ActionCreators/BrandActionCreator"
import { getProduct } from "../Redux/ActionCreators/ProductActionCreator"
import { useDispatch, useSelector } from 'react-redux'
import SingleProduct from '../components/SingleProduct'


let colors = ["White", "Black", "Blue", "Pink", "Violet", "Green", "Red", "Yellow", "Navy", "Gray", "Orange", "Lavender", "N/A"]
let sizes = ["XXXL", "XXL", "XL", "L", "M", "SM", "XS", "NB", "26", "28", "30", "32", "34", "36", "38", "40", "42", "N/A"]


export default function ShopPage() {
  let [search, setSearch] = useState("")
  let [shortFilter, setShortFilter] = useState("1")

  let [filter, setFilter] = useState({
    maincategory: [],
    subcategory: [],
    brand: [],
    color: [],
    size: []


  })
  let [data, setData] = useState([])

  let MaincategoryStateData = useSelector(state => state.MaincategoryStateData)
  let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
  let BrandStateData = useSelector(state => state.BrandStateData)
  let ProductStateData = useSelector(state => state.ProductStateData)
  let dispatch = useDispatch()


  function getInputCheckBox(key, value) {
    let arr = filter[key]

    if (arr.includes(value))
      arr = arr.filter(x => x !== value)
    else
      arr.push(value)
    setFilter({ ...filter, [key]: arr })
    applyFilter({ ...filter, [key]: arr })
  }

  function postSearchData(e) {
    e.preventDefault()
    let ch = search.toLocaleLowerCase()
    let data = ProductStateData.filter(x => x.status &&
      (x.name.toLocaleLowerCase().includes(ch)) ||
      (x.maincategory.toLocaleLowerCase() === ch) ||
      (x.subcategory.toLocaleLowerCase() === ch) ||
      (x.brand.toLocaleLowerCase() === ch) ||
      (x.color.find(x => x.toLocaleLowerCase() === ch))
    )
    applyshortFilter(shortFilter, data)
  }



  function applyFilter(filter) {
    let data = ProductStateData.filter(x => x.status &&
      (filter.maincategory.length === 0 || filter.maincategory.includes(x.maincategory)) &&
      (filter.subcategory.length === 0 || filter.subcategory.includes(x.subcategory)) &&
      (filter.brand.length === 0 || filter.brand.includes(x.brand)) &&
      (filter.color.length === 0 || (new Set(filter.color).intersection(new Set(x.color))).size > 0) &&
      (filter.size.length === 0 || (new Set(filter.size).intersection(new Set(x.size))).size > 0)
    )

    applyshortFilter(shortFilter, data)
  }


  function applyshortFilter(shortFilter, data) {
    setShortFilter(shortFilter)

    if (shortFilter === "1")
      data = data.sort((x, y) => y.id.localeCompare(x.id))
    else if (shortFilter === "2")
      data = data.sort((x, y) => x.finalPrice - y.finalPrice)
    else
      data = data.sort((x, y) => y.finalPrice - x.finalPrice)

    setData(data)
  }



  useEffect(() => {
    (() => {
      dispatch(getMainCategory())
      if (ProductStateData.length)
        setData(ProductStateData.filter(x => x.status))
    })()

  }, [MaincategoryStateData.length])

  useEffect(() => {
    (() => {
      dispatch(getSubCategory())
      if (ProductStateData.length)
        setData(ProductStateData.filter(x => x.status))
    })()
  }, [SubcategoryStateData.length])

  useEffect(() => {
    (() => {
      dispatch(getBrand())
      if (ProductStateData.length)
        setData(ProductStateData.filter(x => x.status))
    }
    )()
  }, [BrandStateData.length])

  useEffect(() => {
    (() => {
      dispatch(getProduct())
      if (ProductStateData.length)
        setData(ProductStateData.filter(x => x.status))

    })()
  }, [ProductStateData.length])



  return (
    <>
      <div className="container-fluid my-3">
        <div className="row">
          <div className="col-lg-2">
            <h5 className="bg-primary p-1 text-light text-center rounded">MainCategory</h5>
            {
              MaincategoryStateData.filter(x => x.status).map(item => {
                return <div key={item.id} className='ms-2'>
                  <input type='checkbox' onChange={() => getInputCheckBox('maincategory', item.name)} checked={filter.maincategory.includes(item.name)} name={item.name} />
                  <label className='ms-2'>{item.name}</label>
                </div>
              })
            }


            <h5 className="bg-primary p-1 text-light text-center rounded mt-3">SubCategory</h5>
            {
              SubcategoryStateData.filter(x => x.status).map(item => {
                return <div key={item.id} className='ms-2'>
                  <input type='checkbox' onChange={() => getInputCheckBox('subcategory', item.name)} checked={filter.subcategory.includes(item.name)} name={item.name} />
                  <label className='ms-2'>{item.name}</label>
                </div>
              })
            }


            <h5 className="bg-primary p-1 text-light text-center rounded mt-3">Brand</h5>
            {
              BrandStateData.filter(x => x.status).map(item => {
                return <div key={item.id} className='ms-2'>
                  <input type='checkbox' onChange={() => getInputCheckBox('brand', item.name)} checked={filter.brand.includes(item.name)} name={item.name} />
                  <label className='ms-2'>{item.name}</label>
                </div>
              })
            }


            <h5 className="bg-primary p-1 text-light text-center rounded mt-3">Color</h5>
            {
              colors.map((item, index) => {
                return <div key={index} className='ms-2'>
                  <input type='checkbox' onChange={() => getInputCheckBox('color', item)} checked={filter.color.includes(item)} name={item.name} />
                  <label className='ms-2'>{item}</label>
                </div>
              })
            }


            <h5 className="bg-primary p-1 text-light text-center rounded mt-3">Size</h5>
            {
              sizes.map((item, index) => {
                return <div key={index} className='ms-2'>
                  <input type='checkbox' onChange={() => getInputCheckBox('size', item)} checked={filter.size.includes(item)} name={item.name} />
                  <label className='ms-2'>{item}</label>
                </div>
              })
            }
          </div>
          <div className="col-lg-10">
            <div className="row">
              <div className="col-lg-8">
                <form onSubmit={postSearchData}>
                  <div className="btn-group w-100">
                    <input type="search" name="search" onChange={(e) => setSearch(e.target.value)} placeholder="Search Product by Name, Maincategory ,Subcategory ,Brand, Color etc"
                      className="form-control border-primary rounded-0 rounded-start" />
                    <button className="btn btn-primary">Search</button>
                  </div>

                </form>

              </div>


              <div className="col-lg-4">

                <select name="shortFilter" onChange={(e) => applyshortFilter(e.target.value, data)} className="form-control border-primary">
                  <option value="1">Latest</option>
                  <option value="2">Price : Low to High</option>
                  <option value="2">Price : High to Low</option>
                </select>


              </div>
            </div>



            <div className="row mt-3">
              {data.map((item) => {
                return <div className="col-lg-4 col-md-6 col-12 mb-3" key={item.id}>
                  <SingleProduct item={item} />

                </div>
              })

              }




            </div>

          </div>

        </div>


      </div>
    </>
  )
}
