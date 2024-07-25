import { Routes, Route } from "react-router-dom";
import { Context } from "../context/UserContext";
import { Fragment, useContext } from "react";
import Alert from "react-bootstrap/Alert";

const PrivareRoutes = (props) => {
  const { user } = useContext(Context);

  if (user && !user.auth) {
    return (
      <Fragment>
        <Alert variant="danger" className="mt-4">
          <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
          <p>You don't have permisson to acces this route</p>
        </Alert>
      </Fragment>
    );
  }
  return <>{props.children}</>;
};

export default PrivareRoutes;
