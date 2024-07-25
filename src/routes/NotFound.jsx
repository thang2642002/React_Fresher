import { Fragment } from "react";
import Alert from "react-bootstrap/Alert";
const NotFound = () => {
  return (
    <Fragment>
      <Alert variant="danger" className="mt-4">
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>Route is the not found</p>
      </Alert>
    </Fragment>
  );
};

export default NotFound;
