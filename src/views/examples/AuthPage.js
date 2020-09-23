//TODO 1 . Import dependencies
import React, { useState, useEffect } from "react";
import { Auth, Hub } from "aws-amplify";
//TODO
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import DemoFooter from "components/Footers/DemoFooter";

const initialFormState = {
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
  authCodeLink: "",
  formType: "signUp",
};
function AuthPage() {
  //TODO 2. PREP SOME STATE OBJECT
  const [formState, updateFormState] = useState(initialFormState);

  const [user, updateUser] = useState(null);

  useEffect(() => {
    checkUser();
    setAuthListener();
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
    const { username, email, password, confirmPassword } = formState;
    await Auth.signUp({ username, email, password, attributes: { email } });
    updateFormState(() => ({ ...formState, formType: "confirmSignUp" }));
  }

  async function confirmSignUp() {
    const { email, authCodeLink } = formState;
    await Auth.confirmSignUp(email, authCodeLink);
    updateFormState(() => ({ ...formState, formType: "signIn" }));
  }
  async function signIn() {
    const { email, password } = formState;
    await Auth.signIn(email, password);
    updateFormState(() => ({ ...formState, formType: "signedIn" }));
  }
  async function signedIn() {}
  return (
    <>
      <div>
        {formType === "signUp" && (
          <div>
            <input name="username" onChange={onChange} placeholder="username" />

            <input name="email" onChange={onChange} placeholder="email" />
            <input
              name="password"
              type="password"
              onChange={onChange}
              placeholder="password"
            />
            <input
              name="confirmPassword"
              type="password"
              onChange={onChange}
              placeholder="confirm password"
            />
            <button onClick={signUp}>Sign Up</button>
            <button
              onClick={() =>
                updateFormState(() => ({
                  ...formState,
                  formType: "signIn",
                }))
              }
            >
              {" "}
              Sign In
            </button>
          </div>
        )}
        {formType === "confirmSignUp" && (
          <div>
            <input
              name="authCodeLink"
              onChange={onChange}
              placeholder="confirmation code"
            />

            <button onClick={confirmSignUp}>Confirm Sign Up</button>
          </div>
        )}
        {formType === "signIn" && (
          <div>
            <input name="email" onChange={onChange} placeholder="email" />
            <input
              name="password"
              type="password"
              onChange={onChange}
              placeholder="password"
            />
            <button onClick={signIn}>Sign In</button>
          </div>
        )}
        {formType === "signedIn" && (
          <div>
            <h1>Welcome user !</h1>
            <button onClick={() => Auth.signOut()}>Sign Out</button>
          </div>
        )}
      </div>
    </>
  );
}

export default AuthPage;
//fmu40350@cuoly.com
