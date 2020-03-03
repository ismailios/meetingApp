import React, { Component } from "react";
import { GoTrashcan, GoListUnordered } from "react-icons/go";
import { FaLink } from "react-icons/fa";
import firebase from "./Firebase";
import { navigate } from "@reach/router";

class MeetingList extends Component {
  deleteMeeting = (e, whichMeeting) => {
    e.preventDefault();
    console.log(this.props.userID);
    const ref = firebase
      .database()
      .ref(`meetings/${this.props.userID}/${whichMeeting}`);
    ref.remove();
  };

  render() {
    const { meetings } = this.props;

    const myMeetings = meetings.map(item => {
      return (
        <div className="list-group-item d-flex" key={item.meetingId}>
          <section className="text-left align-self-center pl-3">
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={e => this.deleteMeeting(e, item.meetingId)}
            >
              <GoTrashcan />
            </button>
            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() =>
                navigate(`checkin/${this.props.userID}/${item.meetingId}`)
              }
            >
              <FaLink />
            </button>

            <button
              className="btn btn-sm btn-outline-secondary"
              onClick={() =>
                navigate(`attendees/${this.props.userID}/${item.meetingId}`)
              }
            >
              <GoListUnordered />
            </button>
          </section>
          <section className="text-left align-self-center pl-3">
            {item.meetingName}
          </section>
        </div>
      );
    });

    return <div>{myMeetings}</div>;
  }
}

export default MeetingList;
