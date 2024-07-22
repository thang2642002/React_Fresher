import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { addNewUser } from "../Services/UserService";
import { useState } from "react";
const ModalAddNewUser = ({ showModal, setShowModal, handleUpadteTable }) => {
  const [name, setName] = useState("");
  const [job, setJob] = useState("");

  const handleClose = () => {
    setShowModal(false);
  };

  const handleAddNew = async () => {
    const res = await addNewUser(name, job);
    if (res && res.id) {
      handleClose();
      setName("");
      setJob("");
      toast.success("Create user is the success");
      handleUpadteTable({ first_name: name, last_name: job, id: res.id });
    } else {
      toast.success("An error...");
    }
  };

  return (
    <Modal show={showModal} onHide={setShowModal}>
      <Modal.Header closeButton>
        <Modal.Title>Add New User</Modal.Title>
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
        <Button variant="primary" onClick={handleAddNew}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalAddNewUser;
