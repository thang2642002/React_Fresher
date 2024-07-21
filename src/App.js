import "./App.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Header from "./Components/Header";
import TableUser from "./Components/TableUser";

function App() {
  return (
    <div className="app-container">
      <Container>
        <Header />
        <TableUser />
      </Container>
    </div>
  );
}

export default App;
