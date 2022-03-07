import React from "react";
import '../App.css';
import { css } from '@emotion/css'
import { useContext } from 'react'
import AllPost from "../components/AllPost";

const Home = () => {

  return (
    <div>
      <AllPost />
    </div>
  );
};

export default Home;
