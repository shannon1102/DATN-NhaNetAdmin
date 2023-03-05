import "./singlePost.scss";

import { useContext } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { useParams } from "react-router-dom";
import useFetch from "../../../hooks/useFetch";
import Sidebar from "../../../components/sidebar/Sidebar";
import Navbar from "../../../components/navbar/Navbar";
import PostMedia from "./PostMedia";

const SinglePost = () => {

  const { user: currUser } = useContext(AuthContext);
  const opts = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    opts.headers.Authorization = "Bearer " + currUser.token;

  const {postId} = useParams();
  const {data, loading, error} = useFetch(`${process.env.REACT_APP_BASE_URL}/posts/${postId}`,opts)
  console.log("PARAMSSSS",data);
  return (
    <div className="single">
      <Sidebar />
      <div className="singleContainer">
        <Navbar />
        <div className="top">
          <div className="left">
            <div className="editButton"></div>
            <h1 className="title">Người đăng</h1>
            <div className="item">
              <img
                src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=750&w=1260"
                alt=""
                className="itemImg"
              />
              <div className="details">
                <h1 className="itemTitle">{data.post?.user.name}</h1>
                <div className="detailItem">
                  <span className="itemKey">Email:</span>
                  <span className="itemValue">{data.post?.user.email}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Phone:</span>
                  <span className="itemValue">{data.post?.user.phone}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Address:</span>
                  <span className="itemValue">
                    {data.post?.user?.adress}
                  </span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Country:</span>
                  <span className="itemValue">Việt Nam</span>
                </div>
                <hr></hr>
                <div className="detailItem">
                  <span className="itemKey">Num of likes :</span>
                  <span className="itemValue">{data.post?.like || 0}</span>
                </div>
                <div className="detailItem">
                  <span className="itemKey">Num of comments:</span>
                  <span className="itemValue">{data.post?.comments.length || 0}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="right">
          </div>
        </div>
        <div className="bottom">
         <h1 className="title">Medias</h1>
        {/*  <List/> */}

          {data.post  && <PostMedia mediaMaps={data.post?.mediaMaps}></PostMedia>}
        </div>
      </div>
    </div>
  );
};

export default SinglePost;
