import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home";
import PrivareRoutes from "./PrivateRoutes";
import Login from "../Components/Login";
import TableUser from "../Components/TableUser";
import NotFound from "./NotFound";
const AppRoutes = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/users"
          element={
            <PrivareRoutes>
              <TableUser />
            </PrivareRoutes>
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
