import React, { Component } from "react";
import FormError from "./FormError";
import firebase from "./Firebase";

class Register extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: "",
      email: "",
      passOne: "",
      passTwo: "",
      errorMessage: null
    };
  }

  changeHandler = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value }, () => {
      if (this.state.passOne !== this.state.passTwo) {
        this.setState({ errorMessage: "Password Not Match" });
      } else {
        this.setState({ errorMessage: null });
      }
    });
  };

  submitHandle = e => {
    e.preventDefault();
    const registrationInfo = {
      displayName: this.state.displayName,
      email: this.state.email,
      password: this.state.passOne
    };

    firebase
      .auth()
      .createUserWithEmailAndPassword(
        registrationInfo.email,
        registrationInfo.password
      )
      .then(() => {
        this.props.registerUser(this.state.displayName);
      })
      .catch(err => {
        if (err.message != null) {
          this.setState({ errorMessage: err.message });
        } else {
          this.setState({ errorMessage: null });
        }
      });
  };

  render() {
    return (
      <form className="mt-3" onSubmit={this.submitHandle}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card bg-light">
                <div className="card-body">
                  <h3 className="font-weight-light mb-3">Register</h3>

                  {this.state.errorMessage && (
                    <FormError errorMessage={this.state.errorMessage} />
                  )}
                  <div className="form-row">
                    <section className="col-sm-12 form-group">
                      <label
                        className="form-control-label sr-only"
                        htmlFor="displayName"
                      >
                        Display Name
                      </label>
                      <input
                        className="form-control"
                        type="text"
                        id="displayName"
                        placeholder="Display Name"
                        name="displayName"
                        required
                        value={this.state.displayName}
                        onChange={this.changeHandler}
                      />
                    </section>
                  </div>

                  <section className="form-group">
                    <label
                      className="form-control-label sr-only"
                      htmlFor="email"
                    >
                      Email
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      id="email"
                      placeholder="Email Address"
                      required
                      name="email"
                      value={this.state.email}
                      onChange={this.changeHandler}
                    />
                  </section>
                  <div className="form-row">
                    <section className="col-sm-6 form-group">
                      <input
                        className="form-control"
                        type="password"
                        name="passOne"
                        placeholder="Password"
                        value={this.state.passOne}
                        onChange={this.changeHandler}
                      />
                    </section>
                    <section className="col-sm-6 form-group">
                      <input
                        className="form-control"
                        type="password"
                        required
                        name="passTwo"
                        placeholder="Repeat Password"
                        value={this.state.passTwo}
                        onChange={this.changeHandler}
                      />
                    </section>
                  </div>
                  <div className="form-group text-right mb-0">
                    <button className="btn btn-primary" type="submit">
                      Register
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    );
  }
}

export default Register;
