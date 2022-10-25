import { Table } from "react-bootstrap";

export default function UserTable({ userData }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th style={{ width: 40, textAlign: "center" }}>
            <input type="checkbox" />
          </th>
          <th style={{ width: 40, textAlign: "center" }}>#</th>
          <th>Name</th>
          <th>Country</th>
          <th>Job</th>
        </tr>
      </thead>
      <tbody>
        {userData.map((user) => {
          return (
            <tr key={user.id}>
              <td style={{ width: 40, textAlign: "center" }}>
                <input type="checkbox" />
              </td>
              <td style={{ width: 40, textAlign: "center" }}>{user.id + 1}</td>
              <td>{`${user.firstName} ${user.lastName}`}</td>
              <td>{user.country}</td>
              <td>{user.job}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}
