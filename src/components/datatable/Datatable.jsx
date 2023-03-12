import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { userColumns, userRows } from "../../datatablesource";
import { Link, useLocation } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { SearchContext } from "../../context/SearchContext";
const Datatable = ({ columns }) => {
  const { user } = useContext(AuthContext);
  const { search } = useContext(SearchContext);
  console.log("Searchhhhhhhhhhhhhh", search);
  const opts = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  opts.headers.Authorization = "Bearer " + user.token;
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const [list, setList] = useState();
  const { data, loading, error } = useFetch(
    `${process.env.REACT_APP_BASE_URL}/${path}`,
    opts
  );

  console.log("Dataaaaaa", data);
  useEffect(() => {
    setList(data);
  }, [data, search]);

  const handleDelete = async (id) => {
    try {
      console.log("Opts", id);
      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/${path}/${id}`,
        opts
      );
      setList(list.filter((item) => item.id !== id));
    } catch (err) {}
  };

  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            {path =="users" && <Link
              to={`/${path}/${params.row.id}`}
              style={{ textDecoration: "none" }}
            >
              <div className="viewButton">View</div>
            </Link>}
            <div
              className="deleteButton"
              onClick={() => {
                console.log("<><<<<<", params);
                handleDelete(params.row?.id);
              }}
            >
              Xóa
            </div>
          </div>
        );
      },
    },
  ];
  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Thêm mới
        </Link>
      </div>
      {list && (
        <DataGrid
          sx={{
            ".MuiDataGrid-columnSeparator": {
              display: "none",
            },
            "&.MuiDataGrid-root": {
              border: "none",
            },
          }}
          className="datagrid"
          rows={list.filter(
            (e) =>
              e.name?.toLowerCase().includes(search.toLowerCase()) ||
              e.email?.toLowerCase().includes(search.toLowerCase()) ||
              e.title?.toLowerCase().includes(search.toLowerCase()) ||
              e.description?.toLowerCase().includes(search.toLowerCase()) ||
              e.customerName?.toLowerCase().includes(search.toLowerCase()) ||
              e.customerEmail?.toLowerCase().includes(search.toLowerCase())
          )}
          columns={columns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          getRowId={(row) => row?.id}
        />
      )}
    </div>
  );
};

export default Datatable;
