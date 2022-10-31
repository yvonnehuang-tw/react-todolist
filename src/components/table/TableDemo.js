import styles from "../../styles/Table.module.css";
import { Button } from "react-bootstrap";

// import { useEffect, useState, useReducer, useRef } from "react";
import { useEffect, useState, useReducer } from "react";
import reducer from "../../reducer/reducer";

import Loading from "../common/Loading";
import UserTable from "./UserTable";
import AddUserModal from "./AddUserModal";
import DeleteUserModal from "./DeleteUserModal";

export default function TableDemo() {
  // const ref = useRef(false);

  // const [loading, setLoading] = useState(false);
  const [loading, dispatch] = useReducer(reducer, { status: false });

  const [userData, setUserData] = useState([]);
  const [inputText, setInputText] = useState("");
  const [originUserData, setOriginUserData] = useState([]);

  const [addModalShow, setAddModalShow] = useState(false);
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [deleteBtnDisable, setDeleteBtnDisable] = useState(true);

  useEffect(() => {
    // if (ref.current) {
    //   getUserData();
    // }
    // return () => {
    //   ref.current = true;
    // };
    getUserData();
  }, []);

  async function getUserData() {
    try {
      // setLoading(true);
      dispatch({ type: "IS_LOADING", nextLoading: true });
      const response = await fetch("http://localhost:8888/user");
      const data = await response.json();
      const tmpData = data.map((item) => {
        return { ...item, checked: false };
      });
      setUserData(tmpData);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      // setLoading(false);
      dispatch({ type: "IS_LOADING", nextLoading: false });
    }
  }

  function removeMultipleUserData() {
    const tmpDeleteUsers = userData.filter((item) => item.checked);

    dispatch({ type: "IS_LOADING", nextLoading: true });
    setDeleteModalShow(false);

    Promise.all(
      tmpDeleteUsers.map((user) =>
        fetch(`http://localhost:8888/user/${user.id}`, {
          method: "DELETE",
        }).catch((error) => console.error("Error:", error))
      )
    )
      .then(() => {
        getUserData();
        setDeleteBtnDisable(true);
      })
      .then(() => {
        dispatch({ type: "IS_LOADING", nextLoading: false });
      });
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

  function handleSearchData(e) {
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
    removeMultipleUserData();
  };

  return (
    <div className="main">
      <div className={styles.tableContainer}>
        {/* {loading && <Loading />} */}
        {loading.status && <Loading />}

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
          onCloseBtn={() => handleCloseBtn("add")}
          onSaveBtn={handleAddSaveBtn}
        />

        <DeleteUserModal
          modalShow={deleteModalShow}
          onCloseBtn={() => handleCloseBtn("delete")}
          onSaveBtn={handleDeleteSaveBtn}
        />
      </div>
    </div>
  );
}
