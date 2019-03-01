import React from "react";

import Modal from "../../components/UI/Modal/Modal";
import Aux from "../Auxiliar/Auxiliar";
import useHttpErrorHandler from "../../hooks/http-error-handler";

const withErrorHandler = (WrappedComponent, axios) => {
  // return class extends Component {
  return props => {
    const [error, clearError] = useHttpErrorHandler(axios);

    return (
      <Aux>
        <Modal show={error} modalClosed={clearError}>
          {error ? error.message : null}
        </Modal>
        <WrappedComponent {...props} />
      </Aux>
    );
  };
};

export default withErrorHandler;
