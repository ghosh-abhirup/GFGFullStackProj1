import React from "react";
import User from "../User/user";
import "./users.css";
import Spinner from "../Commons/Spinner";

class Users extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      usersData: [],
      searchValue: "",
      completeData: [],
    };
  }

  componentDidMount() {
    fetch("https://dummyapi.io/data/v1/user", {
      headers: {
        "app-id": "62f7889bc62f3151ed9c2de6",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        this.setState({
          isLoading: false,
          usersData: data.data,
        });
        this.completeData = data.data;
      });
  }

  onInputChange(e) {
    const value = e.target.value.toLowerCase();
    this.setState({ searchValue: value });

    const filteredData = this.completeData.filter((user) => {
      return user.firstName.toLowerCase().startsWith(value);
    });
    this.setState({ usersData: filteredData });
  }

  showSpinner() {
    return <Spinner />;
  }

  showUser() {
    return (
      <div>
        <input
          onChange={(e) => this.onInputChange(e)}
          value={this.state.searchValue}
          type="text"
        />
        <div className="usersDiv">
          {this.state.usersData.map((person) => {
            return <User data={person} />;
          })}
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <h1>Employee List</h1>
        {this.state.isLoading ? this.showSpinner() : this.showUser()}
      </div>
    );
  }
}

export default Users;
