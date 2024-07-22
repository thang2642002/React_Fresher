import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ReactPaginate from "react-paginate";
import ModalAddNewUser from "../Components/ModalAddNewUser";
import { getListUser, deleteUser } from "../Services/UserService";
import { useEffect, useState } from "react";
import ModalEditUser from "./ModalEditUser";
import ModalDeleteCofirm from "./ModalDeleteCofirm";
import { toast } from "react-toastify";

const TableUser = () => {
  const [listUser, setListUser] = useState([]);
  const [totalUser, setTotalUser] = useState(0);
  const [totalPage, setTotalPage] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showModalUpdateUser, setShowModalUpdateUser] = useState(false);
  const [dataUpdateUser, setDataUpdateUser] = useState({});
  const [showModalDeleteUserConfirm, setShowModalDeleteUserConfirm] =
    useState(false);
  const [dataUserDelete, setDataUserDelete] = useState({});

  const ListUser = async (page) => {
    const res = await getListUser(page);
    if (res && res.data) {
      setListUser(res.data);
      setTotalUser(res.total);
      setTotalPage(res.total_pages);
    }
  };

  const handlePageClick = (event) => {
    ListUser(+event.selected + 1);
  };

  const handleUpadteTable = (user) => {
    setListUser([user, ...listUser]);
  };

  const handleEditFromUser = (updatedUser) => {
    const index = listUser.findIndex((item) => item.id === updatedUser.id);
    if (index !== -1) {
      const updatedList = [...listUser];
      updatedList[index] = updatedUser;
      setListUser(updatedList);
    } else {
      console.error("User not found in the list");
    }
  };

  const handleUpdateUser = (user) => {
    setShowModalUpdateUser(true);
    setDataUpdateUser(user);
  };

  const handleDeleteUser = (user) => {
    setShowModalDeleteUserConfirm(true);
    setDataUserDelete(user);
  };

  const confirmDeleteUser = async () => {
    const res = await deleteUser(dataUserDelete.id);
    if (res && res.statusCode === 204) {
      setListUser(listUser.filter((user) => user.id !== dataUserDelete.id));
      setShowModalDeleteUserConfirm(false);
      toast.success("Delete user success");
    } else {
      toast.error("Delete user failed");
    }
  };

  useEffect(() => {
    ListUser(1);
  }, []);

  return (
    <>
      <div className="my-3 d-flex justify-content-between">
        <span className="fw-bold">List User:</span>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          Add New User
        </button>
      </div>
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
              listUser.map((user, index) => (
                <tr key={index + 1}>
                  <td>{user.id}</td>
                  <td>{user.email}</td>
                  <td>{user.first_name}</td>
                  <td>{user.last_name}</td>
                  <td>
                    <Button
                      variant="warning"
                      onClick={() => handleUpdateUser(user)}
                    >
                      Update
                    </Button>
                    <Button
                      variant="danger"
                      style={{ marginLeft: "30px" }}
                      onClick={() => handleDeleteUser(user)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
          </tbody>
        </Table>
      </div>
      <div
        className="container-paginate"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ReactPaginate
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          marginPagesDisplayed={2}
          pageCount={totalPage}
          previousLabel="< previous"
          pageClassName="page-item"
          pageLinkClassName="page-link"
          previousClassName="page-item"
          previousLinkClassName="page-link"
          nextClassName="page-item"
          nextLinkClassName="page-link"
          breakLabel="..."
          breakClassName="page-item"
          breakLinkClassName="page-link"
          containerClassName="pagination"
          activeClassName="active"
          renderOnZeroPageCount={null}
        />
      </div>
      <ModalAddNewUser
        showModal={showModal}
        setShowModal={setShowModal}
        handleUpadteTable={handleUpadteTable}
      />
      <ModalEditUser
        dataUpdateUser={dataUpdateUser}
        showModalUpdateUser={showModalUpdateUser}
        setShowModalUpdateUser={setShowModalUpdateUser}
        handleEditFromUser={handleEditFromUser}
      />
      <ModalDeleteCofirm
        showModalDeleteUserConfirm={showModalDeleteUserConfirm}
        setShowModalDeleteUserConfirm={setShowModalDeleteUserConfirm}
        dataUserDelete={dataUserDelete}
        confirmDeleteUser={confirmDeleteUser} // Truyền hàm confirmDeleteUser vào ModalDeleteCofirm
      />
    </>
  );
};

export default TableUser;
