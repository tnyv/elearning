import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

export class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: null,
      password: null,
      login: false,
      store: null,
      token: null,
    };
  }

  // handleSubmit(e) {
  //   e.preventDefault();
  //   console.log(e.target.elements.email.value);
  //   console.log(e.target.elements.password.value);
  // }

  login() {
    fetch("auth/login", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    }).then((response) => {
      response.json().then((result) => {
        console.warn("token:", result);
        this.setState({ token: result.data });

        console.log(this.state.token);
      });
    });
  }

  getUsers() {
    fetch("user/getall", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + this.state.token
      },
    }).then((response) => {
      response.json().then((result) => {
        console.log(result);
      });
    });
  }

  render() {
    return (
      <div className="d-flex justify-content-center">
        <Form style={styles.formWrapper} className="col-md-4">
          <FormText>
            <p style={styles.header}>
              Use the information given by your organization to sign in
              to your account
            </p>
          </FormText>
          <FormGroup>
            <Input
              type="email"
              name="email"
              placeholder="Email address (required)"
              onChange={(event) => {
                this.setState({ email: event.target.value });
              }}
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="password"
              placeholder="Password (required)"
              onChange={(event) => {
                this.setState({ password: event.target.value });
              }}
            />
            <FormText className="d-flex justify-content-end">
              <a style={styles.createAccount} href="/">
                Forgot password?
              </a>
            </FormText>
          </FormGroup>
          <FormGroup>
            <Button
              style={styles.signInBtn}
              className="col-md-12 btn-primary"
            >
              Sign in
            </Button>

            <Button
              style={styles.signInBtn}
              className="col-md-12"
              onClick={() => this.getUsers()}
            >
              Get Users
            </Button>
          </FormGroup>
        </Form>
      </div>
    );
  }
}

let styles = {
  createAccount: {
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
};
