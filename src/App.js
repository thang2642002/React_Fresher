import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-toastify/dist/ReactToastify.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer } from "react-toastify";
import { Routes, Route } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Header from "./Components/Header";
import Home from "./Components/Home";
import TableUser from "./Components/TableUser";
import Login from "./Components/Login";
import { Context } from "./context/UserContext"; // Import Context
import { useContext } from "react";

function App() {
  const { user } = useContext(Context);
  return (
    <>
      <div className="app-container">
        <Container>
          <Header />
          <p>Tên tôi là: {user.email}</p>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/users" element={<TableUser />} />
            <Route path="/login" element={<Login />} />
          </Routes>
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
