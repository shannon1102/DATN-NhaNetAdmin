import "./singleUser.scss";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";

import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { postColumns } from "../../../datatablesource";
import List from "../../list/List";
import PostUserDatatable from "../../../components/table/PostUserDataTable";

const SingleUser = () => {
    // const location = useLocation();
    // const path = location.pathname.split("/")[1];
    console.log('???????????????');
    const { user: currUser } = useContext(AuthContext);
    const opts = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      opts.headers.Authorization = "Bearer " + currUser.token;

    const {userId} = useParams();
    const {data, loading, error} = useFetch(`${process.env.REACT_APP_BASE_URL}/profile/${userId}`,opts)
    console.log("PARAMSSSS",data);
  return (
    <>

    <div className="singleUser">
      <Sidebar />


      <div className="singleUserContainer">
        <Navbar />
        <h2 className="sigleUserTitle">Thông tin người dùng</h2>
        <div className="top">
          <div className="left">
            <div className="editButton"></div>
            {/* <h1 className="title">Information</h1> */}
            <div className="item">
              <img
                src={ data?.avatar ? `${process.env.REACT_APP_MEDIA_URL}/${data?.avatar}` :"https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"}
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{data?.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{data?.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Điện thoại:</span>
                  <span className="itemValue">{data?.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Tuổi:</span>
                  <span className="itemValue">{data?.age || 23}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Giới tính:</span>
                  <span className="itemValue">{data?.sex || "Nam"}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Địa chỉ:</span>
                  <span className="itemValue">
                    {data?.address}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Quốc gia:</span>
                  <span className="itemValue">Việt Nam</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
          </div>
        </div>
        <div className="bottom">
        <h1 className="title">Lịch sử đăng bài</h1>
          <PostUserDatatable columns={postColumns}></PostUserDatatable>
        </div>
      </div>
    </div>
    </>
   
  );
};

export default SingleUser;
