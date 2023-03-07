import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import "./home.scss";
import Widget from "../../components/widget/Widget";
import Featured from "../../components/featured/Featured";
import Table from "../../components/table/Table";
import { AuthContext } from "../../context/AuthContext";
import { useContext, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
const Home = () => {
  const { user } = useContext(AuthContext);
  const opts = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  opts.headers.Authorization = "Bearer " + user.token;
  const { data, loading, error } = useFetch(`${process.env.REACT_APP_BASE_URL}/statsics/view`,opts);
  console.log("Data",data);
  return (
    <div className="home">
      <Sidebar />
      <div className="homeContainer">
        <Navbar />
        <div className="widgets">
          <Widget type="user" num={data.numOfUsers} />
          <Widget type="deposit" num={data.numOfDeposits} />
          <Widget type="post" num={data.numOfPosts}/>
          <Widget type="product" num= {data.numOfProducts}/>
        </div>
      </div>
    </div>
  );
};

export default Home;
