import React, { useEffect, useState } from 'react'
import { getWishlist, deleteWishlist } from "../../Redux/ActionCreators/WishlistActionCreator"
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export default function Wishlist() {
  let [data, setData] = useState([])

  let WishlistStateData = useSelector(state => state.WishlistStateData)
  let dispatch = useDispatch()

   function deleteRecord(id) {
      if (window.confirm("Are You Sure You Want To Delete This Record?")) {
       dispatch(deleteWishlist({id: id}))
        setData(data.filter((x) => x.id !== id));
      }
    }  


  useEffect(() => {
    (() => {
      dispatch(getWishlist())
      if (WishlistStateData.length) {
        setData(WishlistStateData.filter(x => x.user === localStorage.getItem("userid")))
      }
    })()
  }, [WishlistStateData.length])

  return (
    <>
      {
        data.length ?
          <table className="table table-bordered">
            <thead>
              <tr>
                <th></th>
                <th>Name</th>
                <th>Brand</th>
                <th>Color</th>
                <th>Size</th>
                <th>Price</th>
                <th>Stock Quantity</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>

              {data.map(item => {
                return <tr key={item.id}>
                  <th>
                    <Link to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`} target='_blank' rel='noreferrer'></Link>
                    <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`} height={50} width={80} atl="" />
                  </th>
                  <th>{item.name}</th>
                  <th>{item.brand}</th>
                  <th>{item.color?.join()}</th>
                  <th>{item.size?.join()}</th>
                  <th>&#8377;{item.price}</th>
                  <th>{`${item.stockQuantity} Left in Stock` }</th>
                  <th><Link to={`/product/${item.product}`} className="btn btn-primary"><i className="bi bi-cart check"></i></Link></th>
                  <th><button className="btn btn-danger" onClick={()=>deleteRecord(item.id)}><i className="bi bi-trash"> </i></button></th>
                </tr>
              })}
            </tbody>
          </table>
          :
          <div className=" card p-5 text-center">
            <h3>OOps</h3>
            <h4>No Item in Wishlist</h4>
            <Link to="/shop" className="btn btn-primary w-25 m-auto">Shop Now</Link>
          </div>
      }

    </>
  )
}
