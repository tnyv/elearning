import React from "react";
import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

export class LoginScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(e.target.elements.email.value);
    console.log(e.target.elements.password.value);
  };

  render() {
    return (
      <div className="d-flex justify-content-center">
        <Form
          style={styles.formWrapper}
          className="col-md-4"
          onSubmit={this.handleSubmit}
        >
          <FormText>
            <p style={styles.header}>
              Use the information given to you by your organization to sign in
              to your account
            </p>
          </FormText>
          <FormGroup>
            <Input
              type="email"
              name="email"
              placeholder="Email address (required)"
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="password"
              placeholder="Password (required)"
            />
            <FormText className="d-flex justify-content-end">
              <a style={styles.createAccount} href="/">
                Forgot password?
              </a>
            </FormText>
          </FormGroup>
          <FormGroup>
            <Button
              type="submit"
              style={styles.signInBtn}
              className="col-md-12"
            >
              Sign in
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
