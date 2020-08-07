import React, { useState, useEffect } from "react";
import { Button, Form, FormGroup, Input, FormText } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwFailed, setPwFailed] = useState(false);
  const history = useHistory();

  // Grab jwt state from store
  const jwt = useSelector((state) => state.jwt);
  const isLogged = useSelector((state) => state.isLogged);
  const dispatch = useDispatch();

  const loginPost = () => {
    dispatch({ type: "ADD_JWT", payload: "hello dude" });
    dispatch({ type: "SET_LOGGED", payload: true });

    // fetch("auth/login", {
    //   method: "POST",
    //   headers: {
    //     Accept: "application/json",
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: email,
    //     password: password,
    //   }),
    // }).then((response) => {
    //   response.json().then((result) => {
    //     console.warn("result:", result);

    //     if (result.success === true) {
    //       setPwFailed(false);

    //       dispatch({ type: "ADD_JWT", payload: result.data });
    //       dispatch({ type: "SET_LOGGED", payload: true });
    //       history.push("/counter");
    //     } else {
    //       setPwFailed(true);
    //     }
    //   });
    // });
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
      loginPost();
    }
  };

  return (
    <div className="d-flex justify-content-center">
      <Form style={styles.formWrapper} className="col-md-4">
        <FormText>
          <p style={styles.header}>
            Use the information given by your organization to sign in to your
            account
          </p>
        </FormText>
        <FormGroup>
          <Input
            type="email"
            name="email"
            placeholder="Email address (required)"
            onChange={(e) => setEmail(e.target.value)}
            onKeyPress={(e) => onKeyDownHandler(e)}
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            name="password"
            placeholder="Password (required)"
            onChange={(e) => setPassword(e.target.value)}
            onKeyPress={(e) => onKeyDownHandler(e)}
          />
          <FormText className="d-flex justify-content-end">
            <a style={styles.forgotPw} href="/">
              Forgot password?
            </a>
          </FormText>
        </FormGroup>
        <FormGroup>
          <Button
            style={styles.signInBtn}
            className="col-md-12 btn-primary"
            onClick={() => loginPost()}
          >
            Sign in
          </Button>
        </FormGroup>
        {pwFailed ? (
          <div style={styles.incorrectPw}>Incorrect email or password</div>
        ) : (
          <div></div>
        )}
      </Form>

      <div>
        <Button
          style={styles.signInBtn}
          className="col-md-12"
          onClick={() => getUsers()}
        >
          Get Users
        </Button>
      </div>
    </div>
  );
};

let styles = {
  forgotPw: {
    color: "black",
    fontSize: "14px",
  },
  formWrapper: {
    marginTop: "100px",
  },
  header: {
    color: "black",
    fontSize: "14px",
    marginBottom: "30px",
  },
  signInBtn: {
    borderRadius: "50px",
  },
  incorrectPw: {
    fontSize: "14px",
    color: "red",
  },
};

export default LoginScreen;
