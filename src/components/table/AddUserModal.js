import { Modal, Button, Row, Col, Form } from 'react-bootstrap';

import { useCallback, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const initialNewUserData = {
  firstName: null,
  lastName: null,
  email: null,
  job: null,
  address: null,
  country: null,
  checked: false,
};

const AddUserModal = ({ modalShow, onCloseBtn, onSaveBtn }) => {
  const { t } = useTranslation();

  const [newUserData, setNewUserData] = useState(initialNewUserData);
  const [saveBtnDisabled, setSaveBtnDisabled] = useState(true);

  const checkFormValid = useCallback(() => {
    const checkingFormValid = () => {
      const isValidResult = !(
        newUserData.firstName &&
        newUserData.lastName &&
        newUserData.email &&
        /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(newUserData.email) &&
        newUserData.job &&
        newUserData.address &&
        newUserData.country
      );
      setSaveBtnDisabled(isValidResult);
    };
    checkingFormValid();
  }, [newUserData]);

  useEffect(() => {
    checkFormValid();
  }, [checkFormValid]);

  // useEffect(() => {
  //   const checkFormValid = () => {
  //     const isValidResult = !(
  //       newUserData.firstName &&
  //       newUserData.lastName &&
  //       newUserData.email &&
  //       /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(newUserData.email) &&
  //       newUserData.job &&
  //       newUserData.address &&
  //       newUserData.country
  //     );
  //     setSaveBtnDisabled(isValidResult);
  //   };
  //   checkFormValid();
  // }, [newUserData]);

  useEffect(() => {
    resetNewUserData();
  }, [modalShow]);

  const resetNewUserData = () => setNewUserData(initialNewUserData);

  const handleChangeUserData = (type, value) => {
    setNewUserData({ ...newUserData, [type]: value });
  };

  const handleClickCloseBtn = () => {
    // setNewUserData(initialNewUserData);
    onCloseBtn();
  };

  const handleClickSaveBtn = () => {
    onSaveBtn(newUserData);
    // setNewUserData(initialNewUserData);
  };

  return (
    <Modal centered show={modalShow} onHide={handleClickCloseBtn}>
      <Modal.Header closeButton>
        <Modal.Title>{t('table.formAddUser')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row className="mb-3">
            {/* First Name */}
            <Form.Group as={Col} controlId="formUserFirstName">
              <Form.Label>{t('table.formFirstName')}</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder={t('table.placeHolderFirstName')}
                autoComplete="new-password"
                // style={{ borderColor: newUserData.firstName === "" ? "red" : "#ced4da" }}
                isValid={!!newUserData.firstName}
                isInvalid={newUserData.firstName === ''}
                onChange={e =>
                  handleChangeUserData('firstName', e.target.value)
                }
              />
            </Form.Group>

            {/* Last Name */}
            <Form.Group as={Col} controlId="formUserLastName">
              <Form.Label>{t('table.formLastName')}</Form.Label>
              <Form.Control
                size="sm"
                type="text"
                placeholder={t('table.placeHolderLastName')}
                autoComplete="new-password"
                // style={{ borderColor: newUserData.lastName === "" ? "red" : "#ced4da" }}
                isValid={!!newUserData.lastName}
                isInvalid={newUserData.lastName === ''}
                onChange={e => handleChangeUserData('lastName', e.target.value)}
              />
            </Form.Group>
          </Row>

          {/* E-mail */}
          <Form.Group className="mb-3" controlId="formUserEmail">
            <Form.Label>{t('table.formEmail')}</Form.Label>
            <Form.Control
              size="sm"
              type="email"
              placeholder={t('table.placeHolderEmail')}
              autoComplete="new-password"
              // style={{ borderColor: newUserData.email === "" ? "red" : "#ced4da" }}
              isValid={
                !!newUserData.email &&
                /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(newUserData.email)
              }
              isInvalid={
                newUserData.email === '' ||
                (newUserData.email &&
                  !/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(
                    newUserData.email
                  ))
              }
              onChange={e => handleChangeUserData('email', e.target.value)}
            />
          </Form.Group>

          {/* Job */}
          <Form.Group className="mb-3" controlId="formUserJob">
            <Form.Label>{t('table.formJob')}</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder={t('table.placeHolderJob')}
              autoComplete="new-password"
              // style={{ borderColor: newUserData.job === "" ? "red" : "#ced4da" }}
              isValid={!!newUserData.job}
              isInvalid={newUserData.job === ''}
              onChange={e => handleChangeUserData('job', e.target.value)}
            />
          </Form.Group>

          {/* Address */}
          <Form.Group className="mb-3" controlId="formUserAddress">
            <Form.Label>{t('table.formAddress')}</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder={t('table.placeHolderAddress')}
              autoComplete="new-password"
              // style={{ borderColor: newUserData.address === "" ? "red" : "#ced4da" }}
              isValid={!!newUserData.address}
              isInvalid={newUserData.address === ''}
              onChange={e => handleChangeUserData('address', e.target.value)}
            />
          </Form.Group>

          {/* Country */}
          <Form.Group className="mb-3" controlId="formUserCountry">
            <Form.Label>{t('table.formCountry')}</Form.Label>
            <Form.Control
              size="sm"
              type="text"
              placeholder={t('table.placeHolderCountry')}
              autoComplete="new-password"
              // style={{ borderColor: newUserData.country === "" ? "red" : "#ced4da" }}
              isValid={!!newUserData.country}
              isInvalid={newUserData.country === ''}
              onChange={e => handleChangeUserData('country', e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClickCloseBtn}>
          {t('table.close')}
        </Button>
        <Button
          variant="primary"
          onClick={handleClickSaveBtn}
          // disabled={
          //   !(
          //     newUserData.firstName &&
          //     newUserData.lastName &&
          //     newUserData.email &&
          //     /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(newUserData.email) &&
          //     newUserData.job &&
          //     newUserData.address &&
          //     newUserData.country
          //   )
          // }
          disabled={saveBtnDisabled}
          // disabled={checkFormValid()}
        >
          {t('table.save')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default AddUserModal;