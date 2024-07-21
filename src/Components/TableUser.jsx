import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import { getListUser } from "../Services/UserService";
import { useEffect, useState } from "react";
const TableUser = () => {
  const [listUser, setListUser] = useState([]);
  const ListUser = async () => {
    const res = await getListUser();
    if (res && res.data) {
      setListUser(res.data);
    }
  };

  useEffect(() => {
    ListUser();
  }, []);

  return (
    <div className="table-user">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Email</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {listUser &&
            listUser.map((user, index) => {
              return (
                <tr key={index + 1}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>
                    <Button variant="warning">Update</Button>
                    <Button variant="danger" style={{ marginLeft: "30px" }}>
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </Table>
    </div>
  );
};

export default TableUser;
