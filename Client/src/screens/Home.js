import React, { useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import exampleImg from "../assets/example.jpg";
import Leaderboard from "../components/Leaderboard";

const scrollToRef = (ref) => window.scrollTo(0, ref.current.offsetTop);

const Home = () => {
  const jwt = useSelector((state) => state.jwt);
  const cookies = new Cookies();

  const clicked = () => {
    console.log(cookies.get("isLogged"));
    console.log(cookies.get("jwt"));
  };

  const name = cookies.get("firstName");
  const points = cookies.get("points");

  const myRef = useRef(null);
  const executeScroll = () => scrollToRef(myRef);

  return (
    <div>
      <div className="jumbotron">
        <h1 className="display-4">Welcome back, {name}!</h1>
        <p className="lead">
          Scroll down to view all available courses. You can earn points and a
          certificate once you have successfully compeleted a course. All of your earned certificates
          can be downloaded&nbsp;
          <Link to="/certificates" style={{ color: "black", textDecoration: "underline" }}>
            here
          </Link>
          .
        </p>


        <hr className="my-4" />
        <div className="row">
          <div className="col-md-6">
            <p className="d-flex justify-content-center">
              <b>My Points</b>
            </p>
            <p
              className="d-flex justify-content-center"
              style={{ fontSize: "120px" }}
            >
              {points}
            </p>
          </div>
          <div className="col-md-6">
            <Leaderboard />
          </div>
        </div>
      </div>

      <div className="jumbotron" ref={myRef}>
        <h1 className="display-4" style={{ fontSize: "36px" }}>
          Beginner Courses
        </h1>
        <hr className="my-4" />
        <div className="row">
          <div className="col-md-4" style={styles.card}>
            <div className="card">
              <img src={exampleImg} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Course 1</h5>
                <p className="card-text">Course summary will go here</p>
                <a href="#" className="btn btn-primary">
                  Take course
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-4" style={styles.card}>
            <div className="card" >
              <img src={exampleImg} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Course 1</h5>
                <p className="card-text">Course summary will go here</p>
                <a href="#" className="btn btn-primary">
                  Take course
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-4" id="courses-top" style={styles.card}>
            <div className="card">
              <img src={exampleImg} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Course 1</h5>
                <p className="card-text">Course summary will go here</p>
                <a href="#" className="btn btn-primary">
                  Take course
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="jumbotron">
        <h1 className="display-4" style={{ fontSize: "36px" }}>
          Intermediate Courses
        </h1>
        <hr className="my-4" />
        <div className="row">
          <div className="col-md-4" style={styles.card}>
            <div className="card">
              <img src={exampleImg} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Course 1</h5>
                <p className="card-text">Course summary will go here</p>
                <a href="#" className="btn btn-primary">
                  Take course
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-4" style={styles.card}>
            <div className="card">
              <img src={exampleImg} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Course 1</h5>
                <p className="card-text">Course summary will go here</p>
                <a href="#" className="btn btn-primary">
                  Take course
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-4" style={styles.card}>
            <div className="card">
              <img src={exampleImg} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Course 1</h5>
                <p className="card-text">Course summary will go here</p>
                <a href="#" className="btn btn-primary">
                  Take course
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="jumbotron">
        <h1 className="display-4" style={{ fontSize: "36px" }}>
          Advanced Courses
        </h1>
        <hr className="my-4" />
        <div className="row">
          <div className="col-md-4">
            <div className="card">
              <img src={exampleImg} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Course 1</h5>
                <p className="card-text">Course summary will go here</p>
                <a href="#" className="btn btn-primary">
                  Take course
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <img src={exampleImg} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Course 1</h5>
                <p className="card-text">Course summary will go here</p>
                <a href="#" className="btn btn-primary">
                  Take course
                </a>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card">
              <img src={exampleImg} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title">Course 1</h5>
                <p className="card-text">Course summary will go here</p>
                <a href="#" className="btn btn-primary">
                  Take course
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

let styles = {
  card: {
    marginBottom: "25px",
  }
}
export default Home;
