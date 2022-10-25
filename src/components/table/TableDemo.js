import styles from "../../styles/Table.module.css";
import { Button, Spinner } from "react-bootstrap";
import { useEffect, useState } from "react";
import UserTable from "./UserTable";

export default function TableDemo() {
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8888/user")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUserData(data);
        setLoading(false);
      })
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className={styles.tableContainer}>
      <h3>User info</h3>
      <hr className="forHR" />

      <div className={styles.toolbarBox}>
        <div className={styles.toolbarBoxLeft}>
          <Button variant="outline-primary">Add</Button>
          <Button variant="outline-secondary" disabled>
            Delete
          </Button>
        </div>
        <div className={styles.toolbarBoxRight}>
          <input type="text" placeholder="&#xF002; Search..." />
        </div>
      </div>

      <UserTable userData={userData} />

      {loading && (
        <div className="loading-content">
          <Spinner animation="border" className="loading-size">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}
    </div>
  );
}
