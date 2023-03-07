import "./newPosts.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useContext, useState } from "react";
import { postInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const { user } = useContext(AuthContext);
  const opts = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  opts.headers.Authorization = "Bearer " + user.token;

  const fileOpts = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  fileOpts.headers.Authorization = "Bearer " + user.token;

  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});

  const navigate = useNavigate();
  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  console.log(files);

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      const fileArr = Array.from(files);
      const list = await Promise.all(
        fileArr.map(async (file) => {
          const data = new FormData();
          data.append("files", file);
          const uploadRes = await axios.post(`${process.env.REACT_APP_MEDIA_URL}`,data, fileOpts);

          const mediaId = uploadRes.data.result[0].id;
          return mediaId;
        })
      );
      console.log("??????????")

      const newPost = {
        ...info,
        media: list,
      };

      console.log("??????wewee????",newPost,process.env.REACT_APP_BASE_URL)
      await axios.post(`${process.env.REACT_APP_BASE_URL}/posts`, newPost, opts);
      console.log("OIIIIIIIIIIIIIII??????????")
      navigate("/posts");
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Thêm mới bài viết</h1>
        </div>
        <div className="bottom">
          <div className="left">
            <img
              src={
                files
                  ? URL.createObjectURL(files[0])
                  : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
              }
              alt=""
            />
          </div>
          <div className="right">
            <form>
              <div className="formInput">
                <label htmlFor="file">
                  Image: <DriveFolderUploadOutlinedIcon className="icon" />
                </label>
                <input
                  type="file"
                  id="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                  style={{ display: "none" }}
                />
              </div>

              {postInputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    id={input.id}
                    onChange={handleChange}
                    type={input.type}
                    placeholder={input.placeholder}
                  />
                </div>
              ))}
              {/* <div className="formInput">
                <label>Featured</label>
                <select id="featured" onChange={handleChange}>
                  <option value={false}>No</option>
                  <option value={true}>Yes</option>
                </select>
              </div>
              <div className="selectPosts">
                <label>Posts</label>
                <select id="posts" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((post) => (
                        <option key={post._id} value={post._id}>
                          {post.title}
                        </option>
                      ))}
                </select>
              </div> */}
              <button onClick={handleClick}>Send</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewPost;
