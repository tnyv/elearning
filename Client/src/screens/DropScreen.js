import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import Cookies from "universal-cookie";
import MyCertificates from "../components/MyCertificates";
import RegisteredCourses from "../components/RegisteredCourses";

const DropScreen = () => {
  const cookies = new Cookies();
  const history = useHistory();

  const [registrations, setRegistrations] = useState([]);
  const [myCourses, setMyCourses] = useState([]);

  const getMyCourses = () => {
    registrations.forEach((element) => {
      fetch("course/" + element, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.get("jwt"),
        },
      }).then((response) => {
        response.json().then((result) => {
          setMyCourses((oldArray) => [...oldArray, result.data]);
        });
      });
    });
  };

  const getRegistrations = async () => {
    await fetch("registration/getall", {
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

  // Initial useEffect()
  useEffect(() => {
    if (!cookies.get("isLogged")) {
      history.push("/login");
    } else {
      getRegistrations();
    }
  }, []);

  // When registrations are retrieved, execute getMyCourses to get courses array.
  useEffect(() => {
    getMyCourses();
  }, [registrations]);

  const drop = (id) => {};

  const myCourseList = myCourses.map((course, index) => {
    return (
      <tr>
        <th scope="row">{course.id}</th>
        <td>{course.name}</td>
        <td>
          <a
            href=""
            onClick={() => {
              drop(course.id);
            }}
          >
            Drop
          </a>
        </td>
      </tr>
    );
  });

  return (
    <div>
      <div className="jumbotron">
        <h1 className="display-4" style={{ fontSize: "36px" }}>
          Drop a course
        </h1>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Course ID</th>
              <th scope="col">Name</th>
              <th scope="col">Last</th>
            </tr>
          </thead>
          <tbody>{myCourseList}</tbody>
        </table>
      </div>
    </div>
  );
};

let styles = {
  card: {
    marginBottom: "25px",
    display: "flex",
    flexWrap: "wrap",
  },
};

export default DropScreen;
