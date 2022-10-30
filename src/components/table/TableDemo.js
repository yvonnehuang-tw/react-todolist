import styles from "../../styles/Table.module.css";
import { Button } from "react-bootstrap";

import { useEffect, useState, useRef } from "react";
// import { useEffect, useState, useReducer, useRef } from "react";
// import reducer from "../../reducer/reducer";

import Loading from "../common/Loading";
import UserTable from "./UserTable";
import AddUserModal from "./AddUserModal";
import DeleteUserModal from "./DeleteUserModal";

export default function TableDemo() {
  const ref = useRef(false);

  const [loading, setLoading] = useState(true);
  // const [loading, dispatch] = useReducer(reducer, { status: true });

  const [userData, setUserData] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [deleteBtnDisable, setDeleteBtnDisable] = useState(true);

  useEffect(() => {
    if (ref.current) {
      getUserData();
    }
    return () => {
      ref.current = true;
    };
  }, []);

  async function getUserData() {
    try {
      const response = await fetch("http://localhost:8888/user");
      const data = await response.json();
      const tmpData = data.map((item) => {
        return { ...item, checked: false };
      });
      setUserData(tmpData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      // dispatch({ type: "IS_LOADING", loading: false });
    }
  }

  async function removeUserData(isRemoveId) {
    try {
      setLoading(true);
      await fetch(`http://localhost:8888/user/${isRemoveId}`, {
        method: "DELETE",
      });
      getUserData();
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
      // dispatch({ type: "IS_LOADING", loading: false });
    }
  }

  function handleTableCheckedAll(tmpChecked) {
    const tmpUserData = userData.map((item) => {
      return { ...item, checked: tmpChecked };
    });
    setUserData(tmpUserData);
    setDeleteBtnDisable(tmpChecked ? false : true);
  }

  function handleChangeDeleteBtnDisable(tmpUserData) {
    setUserData(tmpUserData);

    const hasCheckedData = tmpUserData.filter((data) => data.checked);
    setDeleteBtnDisable(hasCheckedData.length > 0 ? false : true);
  }

  function handleClickAddBtn() {
    setAddModalShow(true);
  }

  function handleClickDeleteBtn() {
    setDeleteModalShow(true);
  }

  const handleCloseBtn = (key) => {
    switch (key) {
      case "add":
        setAddModalShow(false);
        break;
      case "delete":
        setDeleteModalShow(false);
        break;
      default:
        break;
    }
  };

  const handleAddSaveBtn = () => {
    setAddModalShow(false);
  };

  const handleDeleteSaveBtn = () => {
    const tmpDeleteUser = userData.filter((item) => item.checked);
    const removeIdArray = tmpDeleteUser.map((user) => user.id);
    removeIdArray.forEach((id) => removeUserData(id));

    setDeleteModalShow(false);
  };

  return (
    <div className={styles.tableContainer}>
      {loading && <Loading />}
      {/* {loading.status && <Loading />} */}

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
          <input type="text" placeholder="&#xF002; Search..." />
        </div>
      </div>

      <UserTable
        userData={userData}
        onTableCheckedAll={handleTableCheckedAll}
        onChangeDeleteBtnDisable={handleChangeDeleteBtnDisable}
      />

      <AddUserModal
        modalShow={addModalShow}
        onCloseBtn={() => handleCloseBtn("add")}
        onSaveBtn={handleAddSaveBtn}
      />

      <DeleteUserModal
        modalShow={deleteModalShow}
        onCloseBtn={() => handleCloseBtn("delete")}
        onSaveBtn={handleDeleteSaveBtn}
      />
    </div>
  );
}
