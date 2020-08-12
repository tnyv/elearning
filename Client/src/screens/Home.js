import React, { Component } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

const Home = () => {
  const jwt = useSelector((state) => state.jwt);
  const cookies = new Cookies();

  const clicked = () => {
    console.log(cookies.get("isLogged"));
    console.log(cookies.get("jwt"));
  };

  return (
    <div className="jumbotron">
      <h1 className="display-4">Hello, world!</h1>
      <p className="lead">
        This is a simple hero unit, a simple jumbotron-style component for
        calling extra attention to featured content or information.
      </p>
      <hr className="my-4" />
      <p>
        It uses utility classes for typography and spacing to space content out
        within the larger container.
      </p>
      <a className="btn btn-primary btn-lg" href="#" role="button">
        Learn more
      </a>
    </div>
  );
};

export default Home;
