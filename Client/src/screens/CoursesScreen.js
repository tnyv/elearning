import React from "react";
// import Cookies from "universal-cookie";
import exampleImg from "../assets/example.jpg";

const CoursesScreen = () => {
  // const cookies = new Cookies();



  return (
    <div>
      <div className="jumbotron">
        <h1 className="display-4" style={{ fontSize: "36px" }}>
          Available Courses
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

export default CoursesScreen;
