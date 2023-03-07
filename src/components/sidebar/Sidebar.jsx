import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import StoreIcon from "@mui/icons-material/Store";
import FeedIcon from "@mui/icons-material/Feed";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Link, useNavigate } from "react-router-dom";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext } from "react";
import PaymentIcon from "@mui/icons-material/Payment";
import { AuthContext } from "../../context/AuthContext";
const Sidebar = () => {
  // const { dispatch } = useContext(DarkModeContext);
  const { dispatch: authDispatch } = useContext(AuthContext);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  let a = "/user/2"
  const handleLogoutClick = () => {
    try {
      console.log("Logout clicked");
      localStorage.removeItem("user");
      console.log("Logouttttttttttttt");
      localStorage.removeItem("user");
      authDispatch({ type: "LOGOUT" });
      console.log("????????????");
      navigate("/login");
    } catch (error) {}
  };
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">NhaNet</span>
        </Link>
      </div>
      <hr />
      <div className="center">
        <ul>
          <p className="title">Quan trọng</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Trang chủ</span>
            </li>
          </Link>
          <p className="title">Danh mục</p>
          <Link to="/users" style={{ textDecoration: "none" }}>
            <li>
              <PersonOutlineIcon className="icon" />
              <span>Người dùng</span>
            </li>
          </Link>
          <Link to="/products" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Sản phẩm</span>
            </li>
          </Link>
          <Link to="/posts" style={{ textDecoration: "none" }}>
            <li>
              <FeedIcon className="icon" />
              <span>Bài viết</span>
            </li>
          </Link>
          <Link to="/deposits" style={{ textDecoration: "none" }}>
            <li>
              <PaymentIcon className="icon" />
              <span>Giao dịch đặt cọc</span>
            </li>
          </Link>
          <p className="title">Người dùng</p>
          <Link to={`/users/${user.id}`} style={{ textDecoration: "none" }}>
          <li>
            <AccountCircleOutlinedIcon className="icon" />
            <span>Cá nhân</span>
          </li>
          </Link>
         

          <div onClick={handleLogoutClick}>
          <li >
            <ExitToAppIcon className="icon" />
            <span>Đăng xuất</span>
          </li>

          </div>
 
        </ul>
      </div>
      <div className="bottom">
        {/* <div
          className="colorOption"
          onClick={() => dispatch({ type: "LIGHT" })}
        ></div>
        <div
          className="colorOption"
          onClick={() => dispatch({ type: "DARK" })}
        ></div> */}
      </div>
    </div>
  );
};

export default Sidebar;
