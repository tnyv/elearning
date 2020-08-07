import React, { Component } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const Home = () => {
  const jwt = useSelector((state) => state.jwt);


    return (
      <div>

        <button
          onClick={() => {
            console.log(jwt);
          }}
        >
          Test
        </button>
      </div>
    );
  
}

export default Home;