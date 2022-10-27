import styles from "../../styles/Table.module.css";
import { Button, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import UserTable from "./UserTable";
import AddUserModal from "./AddUserModal";
import DeleteUserModal from "./DeleteUserModal";

export default function TableDemo() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [addModalShow, setAddModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [deleteBtnDisable, setDeleteBtnDisable] = useState(true);

  useEffect(() => {
    getUserData();
  }, []);

  async function getUserData() {
    try {
      const response = await fetch("http://localhost:8888/user");
      const data = await response.json();
      data.map((item) => (item.checked = false));
      setUserData(data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  }

  function handleTableCheckedAll(tmpChecked) {
    userData.map((item) => (item.checked = tmpChecked));
    setUserData(userData);

    if (tmpChecked) {
      setDeleteBtnDisable(false);
    } else {
      setDeleteBtnDisable(true);
    }
  }

  function handleChangeDeleteBtnDisable(tmpUserData) {
    setUserData(tmpUserData);

    let hasCheckedData = tmpUserData.filter((data) => data.checked);
    if (hasCheckedData.length > 0) {
      setDeleteBtnDisable(false);
    } else {
      setDeleteBtnDisable(true);
    }
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
    setDeleteModalShow(false);
  };

  return (
    <div className={styles.tableContainer}>
      {loading && (
        <div className="loading-content">
          <Spinner animation="border" className="loading-size">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

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
