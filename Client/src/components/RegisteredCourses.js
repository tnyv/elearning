import React, { useState, useEffect } from "react";
import Cookies from "universal-cookie";
import exampleImg from "../assets/example.jpg";

const RegisteredCourses = (props) => {
  const cookies = new Cookies();
  const [courses, setCourses] = useState([]);


  useEffect(() => {
    setCourses(...courses, props.myCourses);
    console.log(courses);
  },[])



  const myCourseList = props.myCourses.map((course) => {
    return (
      <p>{course.name}</p>
    )
  })

  const testing = () => {
    console.log(courses);
  }

  const testing2 = () => {
    console.log(props.myCourses);
  }

  return (
    <div>
      <p>{myCourseList}</p>

      <div>
      <button onClick={testing}>courses state</button>
      <button onClick={testing2}>props.myCourses</button>
      
      </div>


      <div className="jumbotron">
        <h1 className="display-4" style={{ fontSize: "36px" }}>
          Registered Courses
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
                <h5 className="card-title">Course 2</h5>
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
                <h5 className="card-title">Course 3</h5>
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

export default RegisteredCourses;
