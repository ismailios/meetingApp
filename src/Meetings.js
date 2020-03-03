import React, { Component } from "react";
import MeetingList from "./MeetingList";

class Meetings extends Component {
  constructor(props) {
    super(props);

    this.state = {
      meetingName: ""
    };
  }

  changeHandle = e => {
    this.setState({ [e.target.name]: e.target.value });
  };
  submitHandle = e => {
    e.preventDefault();
    this.props.addMeeting(this.state.meetingName);
    this.setState({ meetingName: " " });
  };

  render() {
    const { meetings } = this.props;

    return (
      <div className="container mt-4">
        <div className="row justify-content-center">
          <div className="col-md-8 text-center">
            <h1 className="font-weight-light">Add a Meeting</h1>
            <div className="card bg-light">
              <div className="card-body text-center">
                <form className="formgroup" onSubmit={this.submitHandle}>
                  <div className="input-group input-group-lg">
                    <input
                      type="text"
                      className="form-control"
                      name="meetingName"
                      placeholder="Meeting name"
                      aria-describedby="buttonAdd"
                      value={this.state.meetingName}
                      onChange={this.changeHandle}
                    />
                    <div className="input-group-append">
                      <button
                        type="submit"
                        className="btn btn-sm btn-info"
                        id="buttonAdd"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>

          <div className="col-11 col-md-§ text-center ">
            <div className="card border-top-0 rounded-0">
              {meetings && meetings.length ? (
                <div className="card-body py-2">
                  <h4 className="card-title font-weight-light m-0">
                    Your Meetings
                  </h4>
                </div>
              ) : null}

              {meetings && (
                <div className="list-group list-group-flush">
                  <MeetingList meetings={meetings} userID={this.props.userID} />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Meetings;
