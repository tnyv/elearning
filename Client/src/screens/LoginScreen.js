import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Input, FormText, NavLink } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const history = useHistory();

  // Grab jwt state from store
  const jwt = useSelector((state) => state.jwt);
  const isLogged = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();

  const httpLogin = () => {
    setLoginFailed(false);

    return new Promise((resolve, reject) => {
      fetch("user/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      }).then((response) => {
        response.json().then((result) => {
          if (result.success) {
            dispatch({ type: "ADD_JWT", payload: result.data });
            dispatch({ type: "SET_LOGGED", payload: true });
            resolve();
          } else {
            reject();
          }
        });
      });
    });
  };

  const goToCounter = () => {
    history.push("/counter");
  };

  const onSubmit = () => {
    httpLogin().then(() => {
      return goToCounter();
    },
    (reject) => {
      setLoginFailed(true);
    });
  };

  const getUsers = () => {
    console.log("jwt: " + jwt);
    console.log("isLogged: " + isLogged);

    if (isLogged) {
      fetch("user/getall", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + jwt,
        },
      }).then((response) => {
        response.json().then((result) => {
          console.log(result);
        });
      });
    }
  };

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      httpLogin();
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Form style={{ marginTop: "120px" }} className="col-md-5">
        <label
          style={{ fontSize: "30px", marginBottom: "10px", color: "black" }}
        >
          {" "}
          Welcome back!
        </label>
        <FormGroup>
          <label>Email</label>
          <Input
            type="email"
            name="email"
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={(e) => onKeyDownHandler(e)}
          />
        </FormGroup>
        <FormGroup>
          <label>Password</label>
          <Input
            type="password"
            name="password"
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => onKeyDownHandler(e)}
          />
          <FormText className="d-flex justify-content-end">
            <NavLink
              tag={Link}
              to="/"
              style={{ padding: "0", color: "black", fontSize: "14px" }}
            >
              Forgot password?
            </NavLink>
          </FormText>
        </FormGroup>
        <FormGroup>
          <Button
            className="col-md-12 btn-primary"
            style={{ borderRadius: "20px" }}
            onClick={() => onSubmit()}
          >
            Sign in
          </Button>
        </FormGroup>
        {loginFailed ? (
          <div style={{ color: "red" }}>Incorrect email or password</div>
        ) : (
          <div></div>
        )}
      </Form>
    </div>
  );
};

export default LoginScreen;
