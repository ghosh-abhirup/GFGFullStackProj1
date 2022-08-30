import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Spinner from "../Commons/Spinner";
import "./UserModal.css";

function UserModal(props) {
  const { id, closeModal } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);

  const { spinnerMessage, showModalBody, onClickClose } = useUserModalHook(
    id,
    closeModal,
    userData
  );

  useEffect(() => {
    fetch(`https://dummyapi.io/data/v1/user/${id}`, {
      headers: {
        "app-id": "62f7889bc62f3151ed9c2de6",
      },
    })
      .then((data) => data.json())
      .then((data) => {
        setIsLoading(false);
        setUserData(data);
      });
  }, []);

  return (
    <div className="userModal">
      <Modal.Dialog>
        <Modal.Header closeButton>
          <Modal.Title>Complete User Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {isLoading ? <Spinner message={spinnerMessage()} /> : showModalBody()}
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={onClickClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    </div>
  );
}

function useUserModalHook(id, closeModal, userData) {
  function onClickClose() {
    closeModal();
  }

  function showModalBody() {
    const {
      title,
      firstName,
      lastName,
      picture,
      dateOfBirth,
      email,
      gender,
      phone,
    } = userData;

    return (
      <div className="userModalBody">
        <img src={picture} alt="" />

        <div>
          <h2>{`${title} ${firstName} ${lastName}`}</h2>
          <h4>Gender: {gender}</h4>
          <h4>Email: {email}</h4>
          <h4>Phone Number: {phone}</h4>
          <h4>Date of Birth: {dateOfBirth}</h4>
        </div>
      </div>
    );
  }

  function spinnerMessage() {
    return `Loading details of Id - ${id}`;
  }

  return { spinnerMessage, showModalBody, onClickClose };
}

export default UserModal;
