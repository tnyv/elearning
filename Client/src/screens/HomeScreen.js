import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import Leaderboard from "../components/Leaderboard";
import RegisteredCourses from "../components/RegisteredCourses";
// import { useSelector, useDispatch } from "react-redux";

const HomeScreen = () => {
  // const jwt = useSelector((state) => state.jwt);
  const cookies = new Cookies();
  const history = useHistory();

  const [name, setName] = useState("");
  const [points, setPoints] = useState("");
  const [registrations, setRegistrations] = useState([]);
  const [myCourses, setMyCourses] = useState([]);

  const loginSuccess = () => {
    console.log(myCourses.length);
  };

  const getMyCourses = () => {
    let array = [];

    registrations.forEach(element => {
      fetch("course/" + element, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.get("jwt"),
        },
      }).then((response) => {
        response.json().then((result) => {
          console.log(element + " ELEMENT");
          array.push(result.data);
        });
      });
    })

    setMyCourses(...myCourses, array);
  }

  

  const getRegistrations = () => {
    fetch("registration/getall", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.get("jwt"),
      },
    }).then((response) => {
      response.json().then((result) => {
        let array = result.data;
        let myRegistrations = [];

        array.forEach((element) => {
          myRegistrations.push(element.courseId);
        });

        setRegistrations(...registrations, myRegistrations);
      });
    });
  };

  // Used first to pupulate elements
  useEffect(() => {
    if (!cookies.get("isLogged")) {
      history.push("/login");
    } else {
      setName(cookies.get("firstName"));
      setPoints(cookies.get("points"));
      getRegistrations();
    }
  }, []);

  // When registrations are retrieved, execute getMyCourses to get courses array.
  useEffect(() => {
    console.log(registrations);
    getMyCourses();
    loginSuccess();
  }, [registrations])

  useEffect(() => {
    loginSuccess();
  }, [myCourses])

  return (
    <div>
      <button onClick={loginSuccess}></button>
      <div className="jumbotron">
        <h1 className="display-4">Welcome back, {name}!</h1>
        <p className="lead">
          Scroll down to view your registered Registrations. You can view all
          available Registrations by clicking "Registrations" in the navigation bar above.
          You can earn points and a certificate once you have successfully
          compeleted a course. All of your earned certificates can be
          downloaded&nbsp;
          <Link
            to="/certificates"
            style={{ color: "black", textDecoration: "underline" }}
          >
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
      <RegisteredCourses />
    </div>
  );
};

export default HomeScreen;
