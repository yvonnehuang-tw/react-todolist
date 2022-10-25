import { Modal, Button, Row, Col, Form } from "react-bootstrap";

export default function AddUserModal({ modalShow, onCloseBtn, onSaveBtn }) {
  return (
    <Modal centered show={modalShow} onHide={onCloseBtn}>
      <Modal.Header closeButton>
        <Modal.Title>Add user</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} controlId="formUserFirstName">
              <Form.Label>First name</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Enter first name"
                autoComplete="new-password"
              />
            </Form.Group>

            <Form.Group as={Col} controlId="formUserLastName">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder="Enter last name"
                autoComplete="new-password"
              />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formUserEmail">
            <Form.Label>E-mail</Form.Label>
            <Form.Control
              size="sm"
              type="email"
              placeholder="Enter email"
              autoComplete="new-password"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formUserCountry">
            <Form.Label>Country</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Enter country"
              autoComplete="new-password"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formUserAddress">
            <Form.Label>Address</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Enter address"
              autoComplete="new-password"
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formUserJob">
            <Form.Label>Job</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder="Enter job"
              autoComplete="new-password"
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onCloseBtn}>
          Close
        </Button>
        <Button variant="primary" onClick={onSaveBtn}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
