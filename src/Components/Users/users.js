import React, { useEffect, useRef, useState } from "react";
import User from "../User/user";
import "./users.css";
import Spinner from "../Commons/Spinner";
import UserModal from "../UserModal/UserModal";

function Users() {
  var completeData = useRef(null);
  var id = useRef(null);

  const [isLoading, setIsLoading] = useState(true);
  const [usersData, setUsersData] = useState([]);
  const [searchValue, setSearchValue] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch("https://dummyapi.io/data/v1/user", {
      headers: {
        "app-id": "62f7889bc62f3151ed9c2de6",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        setIsLoading(false);
        setUsersData(data.data);
        completeData.current = data.data;
      });
  }, []);

  function onInputChange(e) {
    const value = e.target.value.toLowerCase();
    setSearchValue(value);

    const filteredData = completeData.current.filter((user) => {
      return user.firstName.toLowerCase().startsWith(value);
    });
    setUsersData(filteredData);
  }

  function showSpinner() {
    return <Spinner />;
  }

  function showUser() {
    return (
      <div>
        <input
          onChange={(e) => onInputChange(e)}
          value={searchValue}
          type="text"
        />
        <div className="usersDiv">
          {usersData.map((person) => {
            return <User data={person} openModal={openModal} />;
          })}
        </div>
      </div>
    );
  }

  function openModal(id_) {
    id.current = id_;
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
  }

  return (
    <div>
      <h1>Employee List</h1>
      {isLoading ? showSpinner() : showUser()}
      {isModalOpen && <UserModal id={id.current} closeModal={closeModal} />}
    </div>
  );
}

export default Users;
