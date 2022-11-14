import { Modal, Button } from 'react-bootstrap';

import { useTranslation } from 'react-i18next';

export default function EditTodoModal({
  todoContent,
  editModalShow,
  onChangeTodo,
  onCloseEditModal,
  onSaveChangeTodo,
}) {
  const { t } = useTranslation();

  const handleCloseBtn = () => {
    onCloseEditModal();
  };

  const handleSaveBtn = () => {
    onSaveChangeTodo();
  };

  const handleChangeTodo = tmpTodoValue => {
    onChangeTodo({ ...todoContent, value: tmpTodoValue });
  };

  return (
    <Modal centered show={editModalShow} onHide={handleCloseBtn}>
      <Modal.Header closeButton>
        <Modal.Title>{t('todolist.edit')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{t('todolist.editTitle')}</p>
        <input
          type="text"
          style={{
            width: 465,
            padding: 10,
            border: '1px solid #ddd',
            borderRadius: 6,
          }}
          value={todoContent.value}
          onChange={e => handleChangeTodo(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseBtn}>
          {t('todolist.close')}
        </Button>
        <Button variant="primary" onClick={handleSaveBtn}>
          {t('todolist.save')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
