import React from "react";
import '../App.css';
import { css } from '@emotion/css'
import { useContext } from 'react'
import AllPost from "../components/AllPost";
import CreatePost from "../components/CreatePost";

const Home = () => {

  return (
    <div>
      <AllPost />
      <br/>
      <CreatePost />
    </div>
  );
};

export default Home;
