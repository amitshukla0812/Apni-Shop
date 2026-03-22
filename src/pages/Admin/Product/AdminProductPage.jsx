import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import DataTable from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import AdminSidebar from "../../../components/Admin/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";

import { getProduct, deleteProduct } from "../../../Redux/ActionCreators/ProductActionCreator"



export default function AdminProductPage() {
  let [data, setData] = useState([])

  let ProductStateData = useSelector(state => state.ProductStateData)
  let dispatch = useDispatch()



  function deleteRecord(id) {
    if (window.confirm("Are You Sure You Want To Delete This Record?")) {
      dispatch(deleteProduct({ id: id }))
      setData(data.filter((x) => x.id !== id));
    }
  }

  useEffect(() => {
    let time = (() => {
      dispatch(getProduct())
      if (ProductStateData.length)
        setData(ProductStateData)
      else
        setData([])


      let time = setTimeout(() => {
        new DataTable("#myTable");
      }, 500);
      return time;
    })();
    return () => {
      clearTimeout(time);
    };
  }, [ProductStateData.length])

  return (
    <div className="container-fluid my-3">
      <div className="row">
        <div className="col-lg-3">
          <AdminSidebar />
        </div>
        <div className="col-lg-9">
          <h5 className="bg-primary text-center p-2 text-light">
            Product
            <Link to="/admin/product/create">
              <i className="bi bi-plus text-light fs-4 float-end"></i>
            </Link>
          </h5>
          <div className="table-responsive">
            <table className="table table-bordered" id="myTable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>MainCategory</th>

                  <th>SubCategory</th>

                  <th>Brand</th>

                  <th>Color</th>

                  <th>Size</th>

                  <th>Base Price</th>

                  <th>Discount</th>

                  <th>Final Price</th>
                  <th>Stock</th>
                  <th>Stock Quantity</th>
                  <th>Pic</th>
                  <th>Status</th>
                  <th>Edit</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.name}</td>
                      <td>{item.maincategory}</td>
                      <td>{item.subcategory}</td>
                      <td>{item.brand}</td>
                      <td>{item.color.join()}</td>
                      <td>{item.size.join()}</td>
                      <td> &#8377; {item.basePrice}</td>
                      <td>{item.discount}% off</td>
                      <td> &#8377; {item.finalPrice}</td>
                      <td>{item.stock ? "In Stock" : "Out of Stock"}</td>
                      <td>{item.stockQuantity}</td>
                      <td>
                        <div style={{ width: 500 }}>
                          {
                            item.pic?.map((p, index) => {
                              return <Link key={index} className="m-1"
                                to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${p}`} target="_blank" rel="noreferror" >
                                <img src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${p}`} height={70} alt="" />
                              </Link>

                            })
                          }
                        </div>
                      </td>
                      <td>{item.status ? "Active" : "Inactive"}</td>
                      <td>
                        <Link
                          to={`/admin/product/update/${item.id}`}
                          className="btn btn-primary"
                        >
                          <i className="bi bi-pencil"></i>
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={`/admin/product/update/${item.id}`}
                          className="btn btn-danger"
                          onClick={() => deleteRecord(item.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
