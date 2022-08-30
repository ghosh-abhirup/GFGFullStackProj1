import logo from "./logo.svg";
import "./App.css";
import Users from "./Components/Users/users";
import LoginForm from "./Components/loginForm/loginForm";
import React, { useState } from "react";
import User from "./Components/User/user";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  function onLoginSuccessful() {
    setIsLoggedIn(true);
  }

  return (
    <div className="App">
      {isLoggedIn ? (
        <Users />
      ) : (
        <LoginForm onLoginSuccessful={onLoginSuccessful()} />
      )}
    </div>
  );
}

export default App;
