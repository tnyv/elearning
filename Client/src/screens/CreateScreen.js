import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Cookies from "universal-cookie";

const CreateScreen = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [organization, setOrganization] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");

  const [isError, setIsError] = useState(false);
  const history = useHistory();
  const cookies = new Cookies();

  return (
    <div className="container">
      <div className="col-md-5" style={{ margin: "auto" }}>
        <form style={{ marginTop: "120px" }}>
          <label
            style={{ fontSize: "30px", marginBottom: "10px", color: "black" }}
          >
            {" "}
            Create an account
          </label>

          <div className="form-group">
            <label>First name</label>
            <input
              className="form-control"
              type="firstName"
              name="firstName"
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Last name</label>
            <input
              className="form-control"
              type="lastName"
              name="lastName"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Organization</label>
            <input
              className="form-control"
              type="organization"
              name="organization"
              onChange={(e) => setOrganization(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              className="form-control"
              type="email"
              name="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              className="form-control"
              type="password"
              name="password"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>Confirm password</label>
            <input
              className="form-control"
              type="confirmPw"
              name="confirmPw"
              onChange={(e) => setConfirmPw(e.target.value)}
            />
          </div>

          <div className="form-group">
            <button
              type="submit"
              className="col-md-12 btn btn-primary"
              style={{ borderRadius: "20px", marginTop: "20px" }}
            >
              Create account
            </button>
          </div>
          {isError ? (
            <div style={{ color: "red" }}>Incorrect email or password</div>
          ) : (
            <div></div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CreateScreen;
