import { useState } from "react";
import { Modal, Button, Row, Col, Form } from "react-bootstrap";

export default function AddUserModal({ modalShow, onCloseBtn, onSaveBtn }) {
  const initialNewUserData = {
    firstName: null,
    lastName: null,
    email: null,
    job: null,
    address: null,
    country: null,
    checked: false,
  };
  const [newUserData, setNewUserData] = useState(initialNewUserData);

  const handleChangeUserData = (type, value) => {
    setNewUserData({ ...newUserData, [type]: value });
  };

  const handleClickCloseBtn = () => {
    setNewUserData(initialNewUserData);
    onCloseBtn();
  };

  return (
    <Modal centered show={modalShow} onHide={handleClickCloseBtn}>
      <Modal.Header closeButton>
        <Modal.Title>Add user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            {/* First Name */}
            <Form.Group as={Col} controlId="formUserFirstName">
              <Form.Label>First name</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Enter first name"
                autoComplete="new-password"
                // style={{ borderColor: newUserData.firstName === "" ? "red" : "#ced4da" }}
                isValid={!!newUserData.firstName}
                isInvalid={newUserData.firstName === ""}
                onChange={(e) => handleChangeUserData("firstName", e.target.value)}
              />
            </Form.Group>

            {/* Last Name */}
            <Form.Group as={Col} controlId="formUserLastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Enter last name"
                autoComplete="new-password"
                // style={{ borderColor: newUserData.lastName === "" ? "red" : "#ced4da" }}
                isValid={!!newUserData.lastName}
                isInvalid={newUserData.lastName === ""}
                onChange={(e) => handleChangeUserData("lastName", e.target.value)}
              />
            </Form.Group>
          </Row>

          {/* E-mail */}
          <Form.Group className="mb-3" controlId="formUserEmail">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              size="sm"
              type="email"
              placeholder="Enter email"
              autoComplete="new-password"
              // style={{ borderColor: newUserData.email === "" ? "red" : "#ced4da" }}
              isValid={
                !!newUserData.email &&
                /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(newUserData.email)
              }
              isInvalid={
                newUserData.email === "" ||
                (newUserData.email &&
                  !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(newUserData.email))
              }
              onChange={(e) => handleChangeUserData("email", e.target.value)}
            />
          </Form.Group>

          {/* Job */}
          <Form.Group className="mb-3" controlId="formUserJob">
            <Form.Label>Job</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Enter job"
              autoComplete="new-password"
              // style={{ borderColor: newUserData.job === "" ? "red" : "#ced4da" }}
              isValid={!!newUserData.job}
              isInvalid={newUserData.job === ""}
              onChange={(e) => handleChangeUserData("job", e.target.value)}
            />
          </Form.Group>

          {/* Address */}
          <Form.Group className="mb-3" controlId="formUserAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Enter address"
              autoComplete="new-password"
              // style={{ borderColor: newUserData.address === "" ? "red" : "#ced4da" }}
              isValid={!!newUserData.address}
              isInvalid={newUserData.address === ""}
              onChange={(e) => handleChangeUserData("address", e.target.value)}
            />
          </Form.Group>

          {/* Country */}
          <Form.Group className="mb-3" controlId="formUserCountry">
            <Form.Label>Country</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Enter country"
              autoComplete="new-password"
              // style={{ borderColor: newUserData.country === "" ? "red" : "#ced4da" }}
              isValid={!!newUserData.country}
              isInvalid={newUserData.country === ""}
              onChange={(e) => handleChangeUserData("country", e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClickCloseBtn}>
          Close
        </Button>
        <Button
          variant="primary"
          onClick={() => onSaveBtn(newUserData)}
          disabled={
            !(
              newUserData.firstName &&
              newUserData.lastName &&
              newUserData.email &&
              newUserData.job &&
              newUserData.address &&
              newUserData.country
            )
          }
        >
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
