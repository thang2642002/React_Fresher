import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const ModalEditUser = ({
  showModalUpdateUser,
  setShowModalUpdateUser,
  dataUpdateUser,
  handleEditFromUser,
}) => {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleClose = () => {
    setShowModalUpdateUser(false);
  };

  const handleEditUser = async () => {
    const updatedUser = { ...dataUpdateUser, first_name: name, last_name: job };
    handleEditFromUser(updatedUser);
    handleClose();
    toast.success("Update user is the success");
  };

  useEffect(() => {
    if (showModalUpdateUser) {
      setName(dataUpdateUser.first_name);
      setJob(dataUpdateUser.last_name);
    }
  }, [dataUpdateUser]);

  return (
    <Modal show={showModalUpdateUser} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              autoFocus
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Job</Form.Label>
            <Form.Control
              type="text"
              value={job}
              onChange={(e) => setJob(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleEditUser}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalEditUser;
