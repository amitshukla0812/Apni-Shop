import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AdminSidebar from "../../../components/Admin/AdminSidebar";
import DataTable from "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.min.css";
import {
  getNewslater,
  updateNewslater,
  deleteNewslater,
} from "../../../Redux/ActionCreators/NewslaterActionCreator";

export default function AdminNewsletterPage() {
  let [data, setData] = useState([]);
  let NewslaterStateData = useSelector((state) => state.NewslaterStateData);
  let dispatch = useDispatch();

  function deleteRecord(id) {
    if (window.confirm("Are You Sure You Want To Delete This Record?")) {
      dispatch(deleteNewslater({ id: id }));
      setData(data.filter((x) => x.id !== id));
    }
  }

  function updateRecord(id) {
    let index = data.findIndex((x) => x.id === id);
    data[index].status = !data[index].status;
    dispatch(updateNewslater({ ...data[index] }));
    setData([...data]);
  }

  useEffect(() => {
    let time = (() => {
      dispatch(getNewslater());
      if (NewslaterStateData ) {
        setData(NewslaterStateData);
      } else {
        setData([]);
      }
      let time = setTimeout(() => {
        new DataTable("#myTable");
      }, 500);
      return time;
    })();
    return () => {
      clearTimeout(time);
    };
  },[NewslaterStateData.length])

  return (
    <div className="container-fluid my-3">
      <div className="row">
        <div className="col-lg-3">
          <AdminSidebar />
        </div>
        <div className="col-lg-9">
          <h5 className="bg-primary text-center p-2 text-light">Newsletter</h5>
          <div className="table-responsive">
            <table className="table table-bordered" id="myTable">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Email</th>
                  <th>Status</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => {
                  return (
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.email}</td>
                      <td
                        style={{ cursor: "pointer" }}
                        title="Click Here to Change the Status"
                        onClick={() => updateRecord(item.id)}
                      >
                        {item.status ? "Active" : "Inactive"}
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => deleteRecord(item.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
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


