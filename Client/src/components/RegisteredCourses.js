import React from "react";
import { Link, useHistory } from "react-router-dom";

const RegisteredCourses = (props) => {
  const myCourseList = props.myCourses.map((course, index) => {
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
          <Link
            to={{
              pathname: "/class",
              courses: props.myCourses,
              courseId: index,
            }}
            className="btn btn-primary"
            style={{ margin: "20px" }}
          >
            Go to course
          </Link>
        </div>
      </div>
    );
  });

  return (
    <div>
      <div className="jumbotron">
        <h1 className="display-4" style={{ fontSize: "36px" }}>
          Registered Courses
        </h1>
        <hr className="my-4" />
        <div className="row">{myCourseList}</div>
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

export default RegisteredCourses;
