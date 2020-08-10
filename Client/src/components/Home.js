import React, { Component } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';

const Home = () => {
  const jwt = useSelector((state) => state.jwt);
  const cookies = new Cookies();

  const clicked = () => {
    console.log(cookies.get('isLogged'));
    console.log(cookies.get('jwt'));
  }

    return (
      <div>

        <button
          onClick={() => {
            clicked();
          }}
        >
          Test
        </button>
      </div>
    );
  
}

export default Home;