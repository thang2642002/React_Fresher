import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer, toast } from "react-toastify";
import Container from "react-bootstrap/Container";
import Header from "./Components/Header";
import TableUser from "./Components/TableUser";

import { useState } from "react";

function App() {
  return (
    <>
      <div className="app-container">
        <Container>
          <Header />
          <TableUser />
        </Container>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
}

export default App;
