//import React from "react";
import { Auth, Hub } from "aws-amplify";
import React, { useEffect, useState } from "react";
import { Link, Redirect } from "react-router-dom";
import {
  Button,
  Form,
  Input,
  Label,
  PaginationLink,
  PaginationItem,
} from "reactstrap";
//const url = "https://ighv7u15x9.execute-api.us-east-1.amazonaws.com/dev/user";
const initialFormState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  authCodeLink: "",
  //formType: "signUp",
  formType: "signIn",
};
function AuthForm() {
  const [formState, updateFormState] = useState(initialFormState);

  const [user, updateUser] = useState(null);

  useEffect(() => {
    checkUser();
    setAuthListener();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function setAuthListener() {
    Hub.listen("auth", (data) => {
      switch (data.payload.event) {
        case "signOut":
          //console.log("user signed out");
          updateFormState(() => ({ ...formState, formType: "signUp" }));
          break;
        default:
          break;
      }
    });
  }

  async function checkUser() {
    try {
      const user = await Auth.currentAuthenticatedUser();
      console.log("User : ", user);
      updateUser(user);
      updateFormState(() => ({ ...formState, formType: "signedIn" }));
    } catch (error) {
      // updateUser(nulls)
    }
  }

  function onChange(e) {
    e.persist();

    updateFormState(() => ({ ...formState, [e.target.name]: e.target.value }));
  }

  const { formType } = formState;
  // Flow of functions for authentication
  // 1. Signup
  async function signUp() {
    //const { email, password } = formState;
    let { username, email, password, confirmPassword } = formState;
    username = email;

    await Auth.signUp({
      username,
      email,
      password,
      attributes: { email },
    });
    updateFormState(() => ({ ...formState, formType: "confirmSignUp" }));
  }

  async function confirmSignUp() {
    const { email, authCodeLink } = formState;
    await Auth.confirmSignUp(email, authCodeLink);
    //maybe here we create in db

    updateFormState(() => ({ ...formState, formType: "signIn" }));
    //New user lambda should be called at this point
  }

  async function signIn() {
    const { email, password } = formState;
    await Auth.signIn(email, password);

    updateFormState(() => ({ ...formState, formType: "signedIn" }));
  }
  async function signedIn() {}

  return (
    <div>
      {formType === "signUp" && (
        <>
          <Link to="/"> Close </Link>

          <div className="forgot">
            <h3 className="title mx-auto">Register</h3>
          </div>

          <Form className="register-form">
            {/*
          <label>Username</label>
          <Input name="username" onChange={onChange} placeholder="username" />
          */}

            <label>Email</label>
            <Input name="email" onChange={onChange} placeholder="email" />
            <label>Password</label>
            <Input
              name="password"
              type="password"
              onChange={onChange}
              placeholder="password"
            />
            <label>Confirm Password</label>
            <Input
              name="confirmPassword"
              type="password"
              onChange={onChange}
              placeholder="confirm password"
            />
            <Button block className="btn-round" color="danger" onClick={signUp}>
              Register
            </Button>
            <Label></Label>
            <div className="forgot">
              <h6>Already have an account ?</h6>
            </div>

            <Button
              block
              className="btn-round"
              color="success"
              onClick={() =>
                updateFormState(() => ({
                  ...formState,
                  formType: "signIn",
                }))
              }
            >
              {" "}
              Sign In
            </Button>
          </Form>
        </>
      )}
      {formType === "confirmSignUp" && (
        <div>
          <label>Confirmation Code </label>

          <Input
            name="authCodeLink"
            onChange={onChange}
            placeholder="confirmation code"
          />

          <Button
            block
            className="btn-round"
            color="danger"
            onClick={confirmSignUp}
          >
            Confirm Sign Up
          </Button>
        </div>
      )}
      {formType === "signIn" && (
        <>
          <Link to="/"> Close </Link>

          <div className="forgot">
            <h3 className="title mx-auto">Sign In</h3>
          </div>

          <div>
            <label>Email</label>
            <Input name="email" onChange={onChange} placeholder="email" />
            <label>Password</label>
            <Input
              name="password"
              type="password"
              onChange={onChange}
              placeholder="password"
            />
            <Button
              block
              className="btn-round"
              color="success"
              onClick={signIn}
            >
              Sign In
            </Button>
            <Label></Label>
            <div className="forgot">
              <h6>Do not have an account?</h6>
            </div>

            <Button
              block
              className="btn-round"
              color="danger"
              onClick={() =>
                updateFormState(() => ({
                  ...formState,
                  formType: "signUp",
                }))
              }
            >
              {" "}
              Register
            </Button>
          </div>
        </>
      )}
      {formType === "signedIn" && <Redirect to="/user/profile" />}
    </div>
  );
}

export default AuthForm;
