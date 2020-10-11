import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

const CoursesScreen = () => {
  const cookies = new Cookies();
  const history = useHistory();

  const [courses, setCourses] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  // Retrieve all available courses from database
  const getCourses = async () => {
    await fetch("course/getall", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.get("jwt"),
      },
    }).then((response) => {
      response.json().then((result) => {
        setCourses([]);
        let array = result.data;
        array.forEach((element) => {
          setCourses((oldArray) => [...oldArray, element]);
        });
      });
    });
  };

  // Retrieves the user's course registrations (which is an array of course id Ints).
  const getRegistrations = () => {
    return new Promise((resolve, reject) => {
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
          resolve();
        });
      });
    });
  };

  const register = (id) => {
    return new Promise((resolve, reject) => {
      fetch("registration", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + cookies.get("jwt"),
        },
        body: JSON.stringify({
          courseId: id,
        }),
      }).then(() => {
        resolve();
      });
    });
  };

  const refresh = () => {
    window.location.reload();
    alert("Your registration is successful!");
  };

  const registerClick = (id) => {
    if (registrations.includes(id)) {
      alert("You're already registered in that class.");
    } else {
      register(id).then(() => {
        return refresh();
      });
    }
  };

  useEffect(() => {
    getCourses();
    getRegistrations();
  }, []);

  useEffect(() => {
    getCourses();
  }, [registrations]);

  const courseList = courses.map((course, index) => {
    return (
      <div
        className="col-xs-12 col-sm-6 col-md-3"
        style={styles.card}
        key={index}
      >
        <div className="card">
          <div className="card-body">
            <h5 className="card-title" style={{ height: "40px" }}>
              {course.name}
            </h5>
            <p className="card-text">{course.summary}</p>
          </div>
          <button
            onClick={() => {
              registerClick(course.id);
            }}
            className="btn btn-primary"
            style={{ margin: "20px" }}
          >
            Register
          </button>
        </div>
      </div>
    );
  });

  return (
    <div>
      <button
        onClick={() => {
          console.log(registrations);
        }}
      >
        COURSES
      </button>
      <div className="jumbotron">
        <h1 className="display-4" style={{ fontSize: "36px" }}>
          Available Courses
        </h1>
        <p className="lead">
          These are the available courses you have not registered.
        </p>
        <hr className="my-4" />
        <div className="row">{courseList}</div>
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

export default CoursesScreen;
