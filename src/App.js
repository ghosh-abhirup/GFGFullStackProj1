import logo from "./logo.svg";
import "./App.css";
import Users from "./Components/Users/users";
import LoginForm from "./Components/loginForm/loginForm";
import React from "react";

class App extends React.Component {
  constructor() {
    super();
    this.state = { isLoggedIn: false };
  }

  onLoginSuccessful() {
    this.setState({ isLoggedIn: true });
  }

  render() {
    return (
      <div className="App">
        {this.state.isLoggedIn ? (
          <Users />
        ) : (
          <LoginForm onLoginSuccessful={this.onLoginSuccessful.bind(this)} />
        )}
      </div>
    );
  }
}

export default App;
