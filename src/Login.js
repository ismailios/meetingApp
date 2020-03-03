import React, { Component } from "react";
import firebase from "./Firebase";
import { navigate } from "@reach/router";
import FormError from "./FormError";

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorMessage: null
    };
  }

  changeHandler = e => {
    e.preventDefault();
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandle = e => {
    e.preventDefault();
    const registrationInfo = {
      email: this.state.email,
      password: this.state.password
    };

    firebase
      .auth()
      .signInWithEmailAndPassword(
        registrationInfo.email,
        registrationInfo.password
      )
      .then(() => {
        navigate("/meetings");
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
            {this.state.errorMessage && (
              <FormError errorMessage={this.state.errorMessage} />
            )}
            <div className="col-lg-6">
              <div className="card bg-light">
                <div className="card-body">
                  <h3 className="font-weight-light mb-3">Log in</h3>
                  <section className="form-group">
                    <label
                      className="form-control-label sr-only"
                      htmlFor="Email"
                    >
                      Email
                    </label>
                    <input
                      required
                      className="form-control"
                      type="email"
                      id="email"
                      name="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.changeHandler}
                    />
                  </section>
                  <section className="form-group">
                    <input
                      required
                      className="form-control"
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={this.state.password}
                      onChange={this.changeHandler}
                    />
                  </section>
                  <div className="form-group text-right mb-0">
                    <button className="btn btn-primary" type="submit">
                      Log in
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
export default Login;
