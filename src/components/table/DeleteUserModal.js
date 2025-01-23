import { Modal, Button } from 'react-bootstrap';

import { useTranslation } from 'react-i18next';

const DeleteUserModal = ({ modalShow, onCloseBtn, onSaveBtn }) => {
  const { t } = useTranslation();

  return (
    <Modal centered show={modalShow} onHide={onCloseBtn}>
      <Modal.Header closeButton>
        <Modal.Title>{t('table.delete')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('table.deleteMessage')}</Modal.Body>
      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onCloseBtn}>
          {t('table.no')}
        </Button>
        <Button variant="danger" onClick={onSaveBtn}>
          {t('table.yes')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteUserModal;