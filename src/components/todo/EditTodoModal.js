import { Modal, Button } from "react-bootstrap";

export default function EditTodoModal({
  todoContent,
  editModalShow,
  onChangeTodo,
  onCloseEditModal,
  onSaveChangeTodo,
}) {
  function handleCloseBtn() {
    onCloseEditModal();
  }

  function handleSaveBtn() {
    onSaveChangeTodo();
  }

  function handleChangeTodo(tmpTodoValue) {
    onChangeTodo({ ...todoContent, value: tmpTodoValue });
  }

  return (
    <Modal centered show={editModalShow} onHide={handleCloseBtn}>
      <Modal.Header closeButton>
        <Modal.Title>Edit</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Please enter to change your todo.</p>
        <input
          type="text"
          style={{ width: 465 }}
          value={todoContent.value}
          onChange={(e) => handleChangeTodo(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseBtn}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSaveBtn}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
