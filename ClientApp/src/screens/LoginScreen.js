import React, { useState } from "react";
import { Button, Form, FormGroup, Input, FormText } from "reactstrap";
import { useSelector, useDispatch } from "react-redux";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [pwFailed, setPwFailed] = useState(false);
  const [token, setToken] = useState("");
  const [isLogged, setIsLogged] = useState(false);

  // Grab jwt state from store
  const jwt = useSelector((state) => state.jwt);
  const dispatch = useDispatch();

  const loginPost = () => {
    fetch("auth/login", {
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
        console.warn("token:", result);

        if (result.success === true) {
          setToken(result.data);
          setIsLogged(true);
          setPwFailed(false);

          dispatch({ type: "ADD_JWT", payload: result.data });
        } else {
          setPwFailed(true);
        }
      });
    });
  };

  const getUsers = () => {
    console.log(isLogged);
    console.log("jwt: " + jwt);

    if (isLogged) {
      fetch("user/getall", {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      }).then((response) => {
        response.json().then((result) => {
          console.log(result);
        });
      });
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
          />
        </FormGroup>
        <FormGroup>
          <Input
            type="password"
            name="password"
            placeholder="Password (required)"
            onChange={(e) => setPassword(e.target.value)}
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

// import React from "react";
// import { Button, Form, FormGroup, Label, Input, FormText } from "reactstrap";

// const loginStore = () => {

// }

// export class LoginScreen extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: null,
//       password: null,
//       store: null,
//       token: null,
//     };
//   }

//   loginPost() {
//     fetch("auth/login", {
//       method: "POST",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         email: this.state.email,
//         password: this.state.password,
//       }),
//     }).then((response) => {
//       response.json().then((result) => {
//         console.warn("token:", result);
//         this.setState({ token: result.data });

//         console.log(this.state.token);
//       });
//     });
//   }

//   getUsers() {
//     fetch("user/getall", {
//       method: "GET",
//       headers: {
//         Accept: "application/json",
//         "Content-Type": "application/json",
//         "Authorization": "Bearer " + this.state.token
//       },
//     }).then((response) => {
//       response.json().then((result) => {
//         console.log(result);
//       });
//     });
//   }

//   render() {
//     return (
//       <div className="d-flex justify-content-center">
//         <Form style={styles.formWrapper} className="col-md-4">
//           <FormText>
//             <p style={styles.header}>
//               Use the information given by your organization to sign in
//               to your account
//             </p>
//           </FormText>
//           <FormGroup>
//             <Input
//               type="email"
//               name="email"
//               placeholder="Email address (required)"
//               onChange={(event) => {
//                 this.setState({ email: event.target.value });
//               }}
//             />
//           </FormGroup>
//           <FormGroup>
//             <Input
//               type="password"
//               name="password"
//               placeholder="Password (required)"
//               onChange={(event) => {
//                 this.setState({ password: event.target.value });
//               }}
//             />
//             <FormText className="d-flex justify-content-end">
//               <a style={styles.createAccount} href="/">
//                 Forgot password?
//               </a>
//             </FormText>
//           </FormGroup>
//           <FormGroup>
//             <Button
//               style={styles.signInBtn}
//               className="col-md-12 btn-primary"
//               onClick={() => this.loginPost()}
//             >
//               Sign in
//             </Button>

//             <Button
//               style={styles.signInBtn}
//               className="col-md-12"
//               onClick={() => this.getUsers()}
//             >
//               Get Users
//             </Button>
//           </FormGroup>
//         </Form>
//       </div>
//     );
//   }
// }

// let styles = {
//   createAccount: {
//     color: "black",
//     fontSize: "14px",
//   },
//   formWrapper: {
//     marginTop: "100px",
//   },
//   header: {
//     color: "black",
//     fontSize: "14px",
//     marginBottom: "30px",
//   },
//   signInBtn: {
//     borderRadius: "50px",
//   },
// };
