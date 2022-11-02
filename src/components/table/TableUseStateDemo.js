import styles from "../../styles/Table.module.css";
import { Button } from "react-bootstrap";

import { useCallback, useEffect, useState } from "react";
import Loading from "../common/Loading";
import UserTable from "./UserTable";
import AddUserModal from "./AddUserModal";
import DeleteUserModal from "./DeleteUserModal";

const URL = process.env.REACT_APP_BASE_URL;
export default function TableUseStateDemo() {
  const [loading, setLoading] = useState(false);
  const [userData, setUserData] = useState([]);
  const [inputText, setInputText] = useState("");
  const [originUserData, setOriginUserData] = useState([]);

  const [addModalShow, setAddModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [deleteBtnDisable, setDeleteBtnDisable] = useState(true);

  const getUserData = useCallback(() => {
    const getUserData = async () => {
      try {
        setLoading(true);
        // const response = await fetch("http://localhost:8888/user");
        // const response = await fetch("http://192.168.78.234:8888/user");
        const response = await fetch(`${URL}:8888/user`);

        const data = await response.json();
        const tmpData = data.map((item) => {
          return { ...item, checked: false };
        });
        setUserData(tmpData);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const postUserData = (tmpNewUserData) => {
    setLoading(true);
    setAddModalShow(false);

    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tmpNewUserData),
    };

    // fetch("http://localhost:8888/user", requestOptions).then(() => getUserData());
    fetch(`${URL}:8888/user`, requestOptions).then(() => getUserData());
  };

  const removeMultipleUserData = () => {
    const tmpDeleteUsers = userData.filter((item) => item.checked);

    setLoading(true);
    setDeleteModalShow(false);

    Promise.all(
      // tmpDeleteUsers.map((user) =>
      //   fetch(`http://localhost:8888/user/${user.id}`, {
      //     method: "DELETE",
      //   }).catch((error) => console.error("Error:", error))
      // )
      tmpDeleteUsers.map((user) =>
        fetch(`${URL}:8888/user/${user.id}`, {
          method: "DELETE",
        }).catch((error) => console.error("Error:", error))
      )
    )
      .then(() => {
        getUserData();
        setDeleteBtnDisable(true);
      })
      .then(() => {
        setLoading(false);
      });
  };

  const handleClickAddBtn = () => setAddModalShow(true);

  const handleClickDeleteBtn = () => setDeleteModalShow(true);

  const handleSearchData = (e) => {
    setInputText(e.target.value.toLowerCase());
    if (e.code === "Enter" && inputText === "") {
      return;
    }
    if (originUserData.length === 0) {
      setOriginUserData(userData);
    }

    if (inputText === "") {
      setUserData(originUserData);
    } else {
      const regExpInputText = new RegExp(inputText, "g");
      const filteredData = originUserData.filter((data) => {
        const tmpName = `${data.firstName} ${data.lastName}`;
        return (
          tmpName.toLowerCase().match(regExpInputText) ||
          data.email.toLowerCase().match(regExpInputText) ||
          data.job.toLowerCase().match(regExpInputText) ||
          data.address.toLowerCase().match(regExpInputText) ||
          data.country.toLowerCase().match(regExpInputText)
        );
      });
      setUserData(filteredData);
    }
  };

  const handleTableCheckedAll = (tmpChecked) => {
    const tmpUserData = userData.map((item) => {
      return { ...item, checked: tmpChecked };
    });
    setUserData(tmpUserData);
    setDeleteBtnDisable(tmpChecked ? false : true);
  };

  const handleChangeDeleteBtnDisable = (tmpUserData) => {
    setUserData(tmpUserData);

    const hasCheckedData = tmpUserData.filter((data) => data.checked);
    setDeleteBtnDisable(hasCheckedData.length > 0 ? false : true);
  };

  const handleAddModalSaveBtn = (tmpNewUserData) => postUserData(tmpNewUserData);

  const handleDeleteModalSaveBtn = () => removeMultipleUserData();

  const handleModalCloseBtn = (key) => {
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

  return (
    <div className="main">
      <div className={styles.tableContainer}>
        {loading && <Loading />}

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
          userData={userData}
          onTableCheckedAll={handleTableCheckedAll}
          onChangeDeleteBtnDisable={handleChangeDeleteBtnDisable}
        />

        <AddUserModal
          modalShow={addModalShow}
          onCloseBtn={() => handleModalCloseBtn("add")}
          onSaveBtn={handleAddModalSaveBtn}
        />

        <DeleteUserModal
          modalShow={deleteModalShow}
          onCloseBtn={() => handleModalCloseBtn("delete")}
          onSaveBtn={handleDeleteModalSaveBtn}
        />
      </div>
    </div>
  );
}
