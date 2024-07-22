import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalDeleteCofirm = ({
  showModalDeleteUserConfirm,
  setShowModalDeleteUserConfirm,
  dataUserDelete,
  confirmDeleteUser,
}) => {
  const handleClose = () => setShowModalDeleteUserConfirm(false);

  return (
    <>
      <Modal show={showModalDeleteUserConfirm} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete User Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this user's information?
          <br />
          <b>Email: {dataUserDelete.email}</b>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="danger" onClick={confirmDeleteUser}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalDeleteCofirm;
