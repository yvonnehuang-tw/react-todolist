import styles from '../../styles/Table.module.css';
import { Button } from 'react-bootstrap';

import { useEffect, useState, useReducer, useCallback } from 'react';
import reducer from '../../reducer/reducer';
import Loading from '../common/Loading';
import UserTable from './UserTable';
import AddUserModal from './AddUserModal';
import DeleteUserModal from './DeleteUserModal';

const URL = process.env.REACT_APP_BASE_URL;
export default function TableUseReducerDemo() {
  const [state, dispatch] = useReducer(reducer, {
    loadingStatus: false,
    userData: [],
    inputText: '',
    originUserData: [],
  });

  const [addModalShow, setAddModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [deleteBtnDisable, setDeleteBtnDisable] = useState(true);

  const getUserData = useCallback(() => {
    const getUserDataFunc = async () => {
      try {
        dispatch({ type: 'trigger_loading', nextLoading: true });

        // const response = await fetch("http://localhost:8888/user");
        // const response = await fetch("http://192.168.78.234:8888/user");
        const response = await fetch(`${URL}:8888/user`);

        const data = await response.json();
        const tmpData = data.map(item => {
          return { ...item, checked: false };
        });

        dispatch({ type: 'changed_user_data', nextUserData: tmpData });
      } catch (error) {
        console.error('Error:', error);
      } finally {
        dispatch({ type: 'trigger_loading', nextLoading: false });
      }
    };

    getUserDataFunc();
  }, []);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const postUserData = tmpNewUserData => {
    dispatch({ type: 'trigger_loading', nextLoading: true });
    setAddModalShow(false);

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(tmpNewUserData),
    };

    // fetch("http://localhost:8888/user", requestOptions).then(() => getUserData());
    fetch(`${URL}:8888/user`, requestOptions).then(() => getUserData());
  };

  const removeMultipleUserData = () => {
    const tmpDeleteUsers = state.userData.filter(item => item.checked);

    dispatch({ type: 'trigger_loading', nextLoading: true });
    setDeleteModalShow(false);

    Promise.all(
      tmpDeleteUsers.map(user =>
        // fetch(`http://localhost:8888/user/${user.id}`, {
        //   method: "DELETE",
        // }).catch((error) => console.error("Error:", error))
        fetch(`${URL}:8888/user/${user.id}`, {
          method: 'DELETE',
        }).catch(error => console.error('Error:', error))
      )
    )
      .then(() => {
        getUserData();
        setDeleteBtnDisable(true);
      })
      .then(() => {
        dispatch({ type: 'trigger_loading', nextLoading: false });
      });
  };

  const handleClickAddBtn = () => setAddModalShow(true);

  const handleClickDeleteBtn = () => setDeleteModalShow(true);

  const handleSearchData = e => {
    dispatch({
      type: 'changed_input_text',
      nextInputText: e.target.value.toLowerCase(),
    });

    if (e.code === 'Enter' && state.inputText === '') {
      return;
    }

    if (state.originUserData.length === 0) {
      dispatch({
        type: 'changed_origin_user_data',
        nextOriginUserData: state.userData,
      });
    }

    if (state.inputText === '') {
      dispatch({
        type: 'changed_user_data',
        nextUserData: state.originUserData,
      });
    } else {
      const regExpInputText = new RegExp(state.inputText, 'g');

      const filteredData = state.originUserData.filter(data => {
        const tmpName = `${data.firstName} ${data.lastName}`;
        return (
          tmpName.toLowerCase().match(regExpInputText) ||
          data.email.toLowerCase().match(regExpInputText) ||
          data.job.toLowerCase().match(regExpInputText) ||
          data.address.toLowerCase().match(regExpInputText) ||
          data.country.toLowerCase().match(regExpInputText)
        );
      });

      dispatch({ type: 'changed_user_data', nextUserData: filteredData });
    }
  };

  const handleTableCheckedAll = tmpChecked => {
    const tmpUserData = state.userData.map(item => {
      return { ...item, checked: tmpChecked };
    });

    dispatch({ type: 'changed_user_data', nextUserData: tmpUserData });
    setDeleteBtnDisable(tmpChecked ? false : true);
  };

  const handleChangeDeleteBtnDisable = tmpUserData => {
    dispatch({ type: 'changed_user_data', nextUserData: tmpUserData });

    const hasCheckedData = tmpUserData.filter(data => data.checked);
    setDeleteBtnDisable(hasCheckedData.length > 0 ? false : true);
  };

  const handleAddModalSaveBtn = tmpNewUserData => postUserData(tmpNewUserData);

  const handleDeleteModalSaveBtn = () => removeMultipleUserData();

  const handleModalCloseBtn = key => {
    switch (key) {
      case 'add':
        setAddModalShow(false);
        break;
      case 'delete':
        setDeleteModalShow(false);
        break;
      default:
        break;
    }
  };

  return (
    <div className="main">
      <div className={styles.tableContainer}>
        {state.loadingStatus && <Loading />}

        <h3>User Info</h3>
        <hr className="forHR" />

        <div className={styles.toolbarBox}>
          <div className={styles.toolbarBoxLeft}>
            <Button variant="primary" onClick={handleClickAddBtn}>
              Add
            </Button>
            <Button
              variant="secondary"
              onClick={handleClickDeleteBtn}
              disabled={deleteBtnDisable}
            >
              Delete
            </Button>
          </div>
          <div className={styles.toolbarBoxRight}>
            <input
              type="text"
              placeholder="&#xF002; Search..."
              onChange={handleSearchData}
              onKeyUp={handleSearchData}
            />
          </div>
        </div>

        <UserTable
          userData={state.userData}
          onTableCheckedAll={handleTableCheckedAll}
          onChangeDeleteBtnDisable={handleChangeDeleteBtnDisable}
        />

        <AddUserModal
          modalShow={addModalShow}
          onCloseBtn={() => handleModalCloseBtn('add')}
          onSaveBtn={handleAddModalSaveBtn}
        />

        <DeleteUserModal
          modalShow={deleteModalShow}
          onCloseBtn={() => handleModalCloseBtn('delete')}
          onSaveBtn={handleDeleteModalSaveBtn}
        />
      </div>
    </div>
  );
}
