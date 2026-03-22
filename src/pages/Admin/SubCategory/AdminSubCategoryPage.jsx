import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import DataTable from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import AdminSidebar from "../../../components/Admin/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";

import { getSubCategory, deleteSubCategory } from "../../../Redux/ActionCreators/subCategoryActionCreator"



export default function AdminSubcategoryPage() {
  let [data, setData] = useState([])

  let SubcategoryStateData = useSelector(state => state.SubcategoryStateData)
  let dispatch = useDispatch()



   function deleteRecord(id) {
    if (window.confirm("Are You Sure You Want To Delete This Record?")) {
     dispatch(deleteSubCategory({id: id}))
      setData(data.filter((x) => x.id !== id));
    }
  }

  useEffect(() => {
   let time = (() => {
      dispatch(getSubCategory())
      if (SubcategoryStateData.length)
        setData(SubcategoryStateData)
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
  }, [SubcategoryStateData.length])

  return (
    <div className="container-fluid my-3">
      <div className="row">
        <div className="col-lg-3">
          <AdminSidebar />
        </div>
        <div className="col-lg-9">
          <h5 className="bg-primary text-center p-2 text-light">
            Subcategory
            <Link to="/admin/subcategory/create">
              <i className="bi bi-plus text-light fs-4 float-end"></i>
            </Link>
          </h5>
          <div className="table-responsive">
            <table className="table table-bordered" id="myTable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
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
                      <td>
                        <Link
                          to={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`}
                          target="_blank"
                          rel="noreferror"
                        >
                          <img
                            src={`${import.meta.env.VITE_APP_IMAGE_SERVER}${item.pic}`}
                            height={70}
                            alt=""
                          />
                        </Link>
                      </td>
                      <td>{item.status ? "Active" : "Inactive"}</td>
                      <td>
                        <Link
                          to={`/admin/subcategory/update/${item.id}`}
                          className="btn btn-primary"
                        >
                          <i className="bi bi-pencil"></i>
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={`/admin/subcategory/update/${item.id}`}
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
