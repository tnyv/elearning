import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import Cookies from 'universal-cookie';

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isError, setIsError] = useState(false);
  const history = useHistory();
  const cookies = new Cookies();

  // Save user data to cookies upon successsful login
  const httpGetUser = () => {
    fetch("user/" + email, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: "Bearer " + cookies.get('jwt')
      }
    }).then((response) => {
      response.json().then((result) => {
        // Set to expire in 24 hours
        const expirationDate = new Date(Date.now() + 60 * 60 * 24 * 1000);

        cookies.set('email', result.data.email, { path: '/', expires: expirationDate });
        cookies.set('firstName', result.data.firstName, { path: '/', expires: expirationDate });
        cookies.set('lastName', result.data.lastName, { path: '/', expires: expirationDate });
        cookies.set('organization', result.data.organization, { path: '/', expires: expirationDate });
        cookies.set('role', result.data.role, { path: '/', expires: expirationDate });
        cookies.set('points', result.data.points, { path: '/', expires: expirationDate });
        cookies.set('certificates', "To be implemented", { path: '/', expires: expirationDate });
      });
    });
  }

  const httpLogin = async () => {
    return fetch("user/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
  };

  const onSubmit = async () => {
    const response = await httpLogin();
    const isSuccess = await response.json().then((result) => {
      // Set to expire in 24 hours
      const expirationDate = new Date(Date.now() + 60 * 60 * 24 * 1000);

      // Set jwt before httpGetUser is executed
      cookies.set('isLogged', result.success, { path: '/', expires: expirationDate });
      cookies.set('jwt', result.data, { path: '/', expires: expirationDate });
      return result.success;
    });

    if (isSuccess) {
      httpGetUser();
      history.push("/counter");
    } else {
      setIsError(true);
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <form
        style={{ marginTop: "120px" }}
        className="col-md-5"
        onSubmit={e => {
          e.preventDefault();
          onSubmit();
        }}>
        <label
          style={{ fontSize: "30px", marginBottom: "10px", color: "black" }}
        >
          {" "}
          Welcome back!
        </label>
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
          <div className="d-flex justify-content-end">
            <Link
              to="/"
              style={{ padding: "0", color: "black", fontSize: "14px" }}
            >
              Forgot password?
            </Link>
          </div>
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="col-md-12 btn btn-primary"
            style={{ borderRadius: "20px" }}
          >
            Sign in
          </button>
        </div>
        {isError ? (
          <div style={{ color: "red" }}>Incorrect email or password</div>
        ) : (
            <div></div>
          )}
      </form>
    </div>
  );
};

export default LoginScreen;
