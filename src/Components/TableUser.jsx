import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import ReactPaginate from "react-paginate";
import _, { debounce } from "lodash";
import { CSVLink, CSVDownload } from "react-csv";
import * as XLSX from "xlsx";
import Papa from "papaparse";
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
  const [dataExport, setDataExport] = useState([]);
  const [customHeaders, setCustomHeaders] = useState([
    { label: "ID", key: "id" },
    { label: "Email", key: "email" },
    { label: "First Name", key: "first_name" },
    { label: "Last Name", key: "last_name" },
  ]);

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

  // const getUsersExport = (event, done) => {
  //   let result = [];
  //   if (listUser && listUser.length > 0) {
  //     result.push(["Id", "Email", "Frist Name", "Last Name"]);
  //     listUser.map((item, index) => {
  //       let arr = [];
  //       arr[0] = item.id;
  //       arr[1] = item.email;
  //       arr[2] = item.first_name;
  //       arr[3] = item.last_name;
  //       result.push(arr);
  //     });
  //     setDataExport(result);
  //     done();
  //   }
  // };

  const exportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(
      listUser.map((user) => {
        let row = {};
        customHeaders.forEach((header) => {
          row[header.label] = user[header.key];
        });
        return row;
      })
    );
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Users");
    XLSX.writeFile(wb, "UsersData.xlsx");
  };

  // const handleImport = (e) => {
  //   if (e.target && e.target.files && e.target.files[0]) {
  //     let file = e.target.files[0];
  //     if (
  //       file.type !==
  //         "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
  //       file.type !== "text/csv"
  //     ) {
  //       toast.error("file format error");
  //     } else {
  //       Papa.parse(file, {
  //         header: true,
  //         complete: function (results) {
  //           console.log("Finished:", results.data);
  //         },
  //       });
  //     }
  //   }
  // };

  const handleImport = (e) => {
    if (e.target && e.target.files && e.target.files[0]) {
      let file = e.target.files[0];
      const fileExtension = file.name.split(".").pop().toLowerCase();

      if (fileExtension === "xlsx") {
        const reader = new FileReader();
        reader.onload = (e) => {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });
          const sheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[sheetName];
          const json = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

          if (json && json.length > 0) {
            const headers = json[0];
            const validHeaders = customHeaders.map((header) => header.label);
            const isValid = headers.every((header) =>
              validHeaders.includes(header)
            );

            if (isValid) {
              const formattedData = json.slice(1).map((row) => {
                let formattedRow = {};
                row.forEach((cell, index) => {
                  formattedRow[customHeaders[index].key] = cell;
                });
                return formattedRow;
              });
              setListUser(formattedData);
              toast.success("Import successful");
            } else {
              toast.error("File headers do not match the required format");
            }
          }
        };
        reader.readAsArrayBuffer(file);
      } else {
        toast.error("Unsupported file format. Please upload an XLSX file.");
      }
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
          <input
            type="file"
            id="import"
            hidden
            onChange={(e) => handleImport(e)}
          />

          {/** <CSVLink
            data={dataExport}
            className="btn btn-success"
            filename={"my-file.csv"}
            asyncOnClick={true}
            onClick={getUsersExport}
          >
            <i class="fa-solid fa-file-arrow-down me-2"></i>
            Export
          </CSVLink> */}

          <button className="btn btn-success" onClick={exportToExcel}>
            <i className="fa-solid fa-file-arrow-down me-2"></i>
            Export
          </button>
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
