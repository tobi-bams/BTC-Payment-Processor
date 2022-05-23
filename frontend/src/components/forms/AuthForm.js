import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import AuthContext from "../../context/auth-context";

import Button from "../ui/Button";
import FormGroup from "../ui/FormGroup";

const AuthForm = () => {
  const history = useHistory();
  const emailInputRef = React.createRef();
  const passwordInputRef = React.createRef();

  const authCtx = useContext(AuthContext);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  function submitHandler(event) {
    // prevent default submit process
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    // @todo: validate the password

    setIsLoading(true);
    let authURL;
    if (isLogin) {
      // if user is logging in:
      authURL = "http://127.0.0.1:5000/auth/sign-in";
    } else {
      // sign up with email and password request to endpoint
      authURL = "http://127.0.0.1:5000/auth/sign-up";
    }
    fetch(authURL, {
      method: "POST",
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            let errorMsg = "Authentication failed!";
            throw new Error(errorMsg);
          });
        }
      })
      .then((data) => {
        const expirationTime = new Date(new Date().getTime() + 3600 * 1000); // convert 1 hour to timestamp (milliseconds)
        // set timer to expire login token after 1 hour
        authCtx.login(data.data.token, expirationTime.toISOString());
        // if login successful, redirect:
        // - check if user has "gotten started: store done and wallets setup". if no, to getting started, if yes to /dashboard/overview
        history.replace("/dashboard/getting-started");
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-center">
        {isLogin ? "Login" : "Sign Up"}
      </h1>
      <form className="w-full mx-auto text-center" onSubmit={submitHandler}>
        <FormGroup>
          <input
            className="w-full border border-gray-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
            type="email"
            required
            id="email"
            ref={emailInputRef}
            placeholder="Enter email address"
          />
        </FormGroup>
        <FormGroup>
          <input
            className="w-full border border-gray-300 rounded-sm px-4 py-3 outline-none transition-colors duration-150 ease-in-out focus:border-blue-400"
            type="password"
            required
            id="password"
            ref={passwordInputRef}
            placeholder="Enter password"
          />
        </FormGroup>
        <FormGroup>
          {!isLoading && (
            <Button
              className="mb-2"
              type="primary"
              text={isLogin ? "Login" : "Create Account"}
              full
              submit
            ></Button>
          )}
          {isLoading && (
            <div
              className="w-full px-6 py-3 rounded-sm border text-gray-800 bg-gray-200 border-gray-300"
              role="alert"
            >
              Sending request...
            </div>
          )}
          <Button
            className="mt-2"
            type="secondary"
            text={
              isLogin ? "Create new account" : "Login with existing account"
            }
            onClick={switchAuthModeHandler}
            full
          ></Button>
        </FormGroup>
      </form>
    </>
  );
};

export default AuthForm;
