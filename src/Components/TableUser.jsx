import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ReactPaginate from "react-paginate";
import _, { debounce } from "lodash";
import { CSVLink, CSVDownload } from "react-csv";
import ModalAddNewUser from "../Components/ModalAddNewUser";
import { toast } from "react-toastify";
import { getListUser, deleteUser } from "../Services/UserService";
import { useEffect, useState } from "react";
import ModalEditUser from "./ModalEditUser";
import ModalDeleteCofirm from "./ModalDeleteCofirm";

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
  const [sortBy, setSortBy] = useState("asc");
  const [sortField, setSortField] = useState("id");
  const [seachEmail, setSeachEmail] = useState("");

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

  const handleSort = (sortBy, sortField) => {
    setSortBy(sortBy);
    setSortField(sortField);
    let cloneListUser = _.cloneDeep(listUser);
    cloneListUser = _.orderBy(cloneListUser, [sortField], [sortBy]);
    setListUser(cloneListUser);
  };

  const handleSeachEmail = (e) => {
    let keyword = e.target.value;
    setSeachEmail(keyword);
    if (keyword) {
      let cloneListUser = _.cloneDeep(listUser);
      cloneListUser = cloneListUser.filter((item) =>
        item.email.includes(keyword)
      );
      setListUser(cloneListUser);
    } else {
      ListUser(1);
    }
  };

  useEffect(() => {
    ListUser(1);
  }, []);

  return (
    <>
      <div className="my-3 d-flex justify-content-between">
        <span className="fw-bold">List User:</span>
        <div className="d-flex justify-content-between gap-3">
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            <i class="fa-solid fa-circle-plus me-2"></i> Add New
          </button>
          <label htmlFor="import" className="btn btn-warning text-light">
            <i class="fa-solid fa-file-import me-2"></i>Import
          </label>
          <input type="file" id="import" hidden />

          <CSVLink
            data={listUser}
            className="btn btn-success"
            target="_blank"
            filename={"my-file.csv"}
          >
            <i class="fa-solid fa-file-arrow-down me-2"></i>
            Export
          </CSVLink>
        </div>
      </div>
      <div className="col-3 my-2">
        <input
          className="form-control"
          placeholder="Seach email user ..."
          value={seachEmail}
          onChange={(e) => handleSeachEmail(e)}
        />
      </div>
      <div className="table-user">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th className="d-flex justify-content-between">
                <span> ID </span>
                <span>
                  <i
                    class="fa-solid fa-arrow-down mx-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSort("desc", "id")}
                  ></i>
                  <i
                    class="fa-solid fa-arrow-up"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSort("asc", "id")}
                  ></i>
                </span>
              </th>
              <th>Email</th>
              <th className="d-flex justify-content-between">
                <span> FirstName </span>
                <span>
                  <i
                    class="fa-solid fa-arrow-down mx-2"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSort("desc", "first_name")}
                  ></i>
                  <i
                    class="fa-solid fa-arrow-up"
                    style={{ cursor: "pointer" }}
                    onClick={() => handleSort("asc", "first_name")}
                  ></i>
                </span>
              </th>

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
