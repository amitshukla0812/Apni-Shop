import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import DataTable from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import AdminSidebar from "../../../components/Admin/AdminSidebar";
import { useDispatch, useSelector } from "react-redux";

import { getFeature, deleteFeature } from "../../../Redux/ActionCreators/FeatureActionCreator"



export default function AdminFeaturePage() {
  let [data, setData] = useState([])

  let FeatureStateData = useSelector(state => state.FeatureStateData)
  let dispatch = useDispatch()



  function deleteRecord(id) {
    if (window.confirm("Are You Sure You Want To Delete This Record?")) {
      dispatch(deleteFeature({ id: id }))
      setData(data.filter((x) => x.id !== id));
    }
  }

  useEffect(() => {
    let time = (() => {
      dispatch(getFeature())
      if (FeatureStateData.length)
        setData(FeatureStateData)
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
  }, [FeatureStateData.length])

  return (
    <div className="container-fluid my-3">
      <div className="row">
        <div className="col-lg-3">
          <AdminSidebar />
        </div>
        <div className="col-lg-9">
          <h5 className="bg-primary text-center p-2 text-light">
            Feature
            <Link to="/admin/feature/create">
              <i className="bi bi-plus text-light fs-4 float-end"></i>
            </Link>
          </h5>
          <div className="table-responsive">
            <table className="table table-bordered" id="myTable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Icon</th>
                  <th>Shot Description</th>
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
                      <td><span className="fs-1" dangerouslySetInnerHTML={{ __html: item.icon }} /></td>
                      <td>{item.shortDescription}</td>

                      <td>{item.status ? "Active" : "Inactive"}</td>
                      <td>
                        <Link
                          to={`/admin/feature/update/${item.id}`}
                          className="btn btn-primary"
                        >
                          <i className="bi bi-pencil"></i>
                        </Link>
                      </td>
                      <td>
                        <Link
                          to={`/admin/feature/update/${item.id}`}
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
