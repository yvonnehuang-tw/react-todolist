import { Modal, Button } from "react-bootstrap";

export default function DeleteUserModal({ modalShow, onCloseBtn, onSaveBtn }) {
  return (
    <Modal centered show={modalShow} onHide={onCloseBtn}>
      <Modal.Header closeButton>
        <Modal.Title>Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>Would you like to delete selected?</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onCloseBtn}>
          No
        </Button>
        <Button variant="danger" onClick={onSaveBtn}>
          Yes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
