import React, { Component } from "react";

class FormError extends Component {
  render() {
    const { errorMessage } = this.props;
    return <div className="alert col-12 px-3 alert-danger">{errorMessage}</div>;
  }
}
export default FormError;
