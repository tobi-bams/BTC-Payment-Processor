import React, { useState, useEffect, useCallback } from "react";

let logoutTimer;

const AuthContext = React.createContext({
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
  storeUser: (token) => {},
  currentUser: {},
});

const calculateRemainingTime = (expirationTime) => {
  // current timestamp in milliseconds
  const currentTime = new Date().getTime();
  // time in the future in milliseconds
  const adjustedExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjustedExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

export const AuthContextProvider = (props) => {
  const tokenData = retrieveStoredToken();
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user"))
  );
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }

  const [token, setToken] = useState(initialToken);

  const userIsLoggedIn = !!token; // if token is empty string will return false, if is a string, return true

  const logoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    // remove stored user json too
    localStorage.removeItem("user");
    localStorage.removeItem("walletData");
    localStorage.removeItem("storeData");
    localStorage.removeItem("nodeStatus");
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const storeUserData = (token) => {
    return fetch("http://127.0.0.1:5000/auth/session", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        // store user object in local storage
        localStorage.setItem("user", JSON.stringify(data));
        setCurrentUser(data);
      });
  };

  const loginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);

    // store currentUser in storage
    storeUserData(token);

    const remainingTime = calculateRemainingTime(expirationTime);
    // logout user after expiration time.
    logoutTimer = setTimeout(logoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: loginHandler,
    logout: logoutHandler,
    storeUser: storeUserData,
    currentUser: currentUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
