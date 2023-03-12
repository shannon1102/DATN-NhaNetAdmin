import "./newProduct.scss";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import { useContext, useState } from "react";
import { houseInputs } from "../../formSource";
import useFetch from "../../hooks/useFetch";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

const NewProduct= () => {
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
  const navigate = useNavigate();

  opts.headers.Authorization = "Bearer " + user.token;
  const [files, setFiles] = useState("");
  const [info, setInfo] = useState({});
  const [rooms, setRooms] = useState([]);

  const { data, loading, error } = useFetch(`${process.env.REACT_APP_BASE_URL}/products`,opts);

  const handleChange = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.id]: e.target.value }));
    console.log("MMMMMMMMM",info)
  };

  const handleSelect = (e) => {
    const value = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );
    setRooms(value);
  };
  
  console.log(files)

  const handleClick = async (e) => {

    console.log("Inforrrrrrrrrr",info);
    e.preventDefault();
    try {
      const list = await Promise.all(
        Object.values(files).map(async (file) => {
          const data = new FormData();
          data.append("files", file);
          data.append("upload_preset", "upload");
          const uploadRes = await axios.post(
          `${process.env.REACT_APP_MEDIA_URL}`,
          data,fileOpts
          );

          const mediaId= uploadRes.data.result[0].id;
          return mediaId;
        })
      );
      let newProduct ={}
      if(list.length>0) {
        newProduct = {
          ...info,
          featureImageId: list[0],
          media: list,
        };
      }else {
        newProduct = {
          ...info
        };
      }

      

      await axios.post(`${process.env.REACT_APP_BASE_URL}/products`, newProduct,opts);
      navigate("/products")
    } catch (err) {console.log(err)}
  };
  return (
    <div className="new">
      <Sidebar />
      <div className="newContainer">
        <Navbar />
        <div className="top">
          <h1>Thêm mới sản phẩm</h1>
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

              {houseInputs.map((input) => (
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
              </div> */}
              {/* <div className="selectRooms">
                <label>Rooms</label>
                <select id="rooms" multiple onChange={handleSelect}>
                  {loading
                    ? "loading"
                    : data &&
                      data.map((room) => (
                        <option key={room._id} value={room._id}>
                          {room.title}
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

export default NewProduct;
