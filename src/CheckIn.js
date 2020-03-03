import React, { Component } from "react";
import firebase from "./Firebase";
import { navigate } from "@reach/router";

export default class CheckIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      displayName: "",
      email: ""
    };
  }

  changeHandle = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  submitHandle = e => {
    e.preventDefault();

    const ref = firebase
      .database()
      .ref(`meetings/${this.props.userID}/${this.props.meetingID}/attendees`);

    ref.push({
      attendeeName: this.state.displayName,
      attendeeEmail: this.state.email
    });
    navigate(`/attendees/${this.props.userID}/${this.props.meetingID}`);
  };

  render() {
    return (
      <form className="mt-3" onSubmit={this.submitHandle}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-6">
              <div className="card bg-light">
                <div className="card-body">
                  <h3 className="font-weight-light mb-3">Check in</h3>
                  <section className="form-group">
                    <label
                      className="form-control-label sr-only"
                      htmlFor="displayName"
                    >
                      Name
                    </label>
                    <input
                      required
                      className="form-control"
                      type="text"
                      id="displayName"
                      name="displayName"
                      placeholder="Name"
                      value={this.state.displayName}
                      onChange={this.changeHandle}
                    />
                  </section>
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
                      onChange={this.changeHandle}
                    />
                  </section>
                  <div className="form-group text-right mb-0">
                    <button className="btn btn-primary" type="submit">
                      Check in
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
