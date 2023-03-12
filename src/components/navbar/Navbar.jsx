import "./navbar.scss";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { DarkModeContext } from "../../context/darkModeContext";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import Button from '@mui/material/Button'
import { SearchContext } from "../../context/SearchContext";

const Navbar = () => {
  // const { dispatch } = useContext(DarkModeContext);
  const { dispatch: searchDispatch } = useContext(SearchContext);
  const {user} = useContext(AuthContext)
  const [searchNav,setSearchNav] = useState("") 
  const {search} = useContext(SearchContext)
  const [query, setQuery] = useState("");
  // console.log("Seacrhhhhhhhhhhhhh",search);

  const handleSearchClick = ()=> {
    console.log("MMMM")
    searchDispatch({ type: "NEW_SEARCH", payload: {search: query}});
  }

  return (
    <div className="navbar">
      <div className="wrapper">
        <div className="search">
          <input type="text" placeholder="Tìm kiếm ..."  onChange={(e)=>{
            // console.log("e",e);
            setQuery(e.target.value)
            console.log(query);
          }
         
            }/>
         
          <Button
            variant="text"
            color="primary"
            startIcon={<SearchOutlinedIcon />}
            onClick ={handleSearchClick}
            
          >
            
          </Button>
          
        </div>
        <div className="items">
          <div className="item">
            <LanguageOutlinedIcon className="icon" />
            Tiếng Việt
          </div>
          {/* <div className="item">
            <DarkModeOutlinedIcon
              className="icon"
              onClick={() => dispatch({ type: "TOGGLE" })}
            />
          </div> */}
          <div className="item">
            <img
              src={`${process.env.REACT_APP_MEDIA_URL}/${user.avatar ||2}`}
              alt=""
              className="avatar"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
