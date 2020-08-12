import React from "react";
import { Link } from "react-router-dom";

const Certificates = () => {
  return (
    <div>
      <p className="d-flex justify-content-center">
        <b>Certificates Earned</b>
      </p>
      <p className="d-flex justify-content-center">
        <Link to="/" style={{ color: "black" }}>
          Example Certificate 1
        </Link>
      </p>
      <p className="d-flex justify-content-center">
        <Link to="/" style={{ color: "black" }}>
          Example Certificate 2
        </Link>
      </p>
      <p className="d-flex justify-content-center">
        <Link to="/" style={{ color: "black" }}>
          Example Certificate 3
        </Link>
      </p>
      <p className="d-flex justify-content-center">
        <Link to="/" style={{ color: "black" }}>
          Example Certificate 4
        </Link>
      </p>
      <p className="d-flex justify-content-center">
        <Link to="/" style={{ color: "black" }}>
          Example Certificate 5
        </Link>
      </p>
      <p className="d-flex justify-content-center">
        <Link to="/" style={{ color: "black" }}>
          View all
        </Link>
      </p>
    </div>
  );
};

export default Certificates;
