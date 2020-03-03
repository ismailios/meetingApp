import React, { Component } from "react";
import "./App.css";
import Welcome from "./Welcome";
import Home from "./Home";
import Navigation from "./Navigation";
import Login from "./Login";
import Register from "./Register";
import Meetings from "./Meetings";
import CheckIn from "./CheckIn";
import Attendees from "./Attendees";

import { Router, navigate } from "@reach/router";
import firebase from "./Firebase";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: null,
      displayName: null,
      userID: null,
      meetings: null,
      howManyMeetings: null
    };
  }

  componentDidMount() {
    firebase.auth().onAuthStateChanged(FBuser => {
      if (FBuser) {
        this.setState({
          user: FBuser,
          displayName: FBuser.displayName,
          userID: FBuser.uid
        });

        const meetingRef = firebase.database().ref(`meetings/${FBuser.uid}`);

        meetingRef.on("value", snapshot => {
          let meetings = snapshot.val();
          let meetingsList = [];

          for (let item in meetings) {
            meetingsList.push({
              meetingId: item,
              meetingName: meetings[item].meetingName
            });
          }

          this.setState({
            meetings: meetingsList,
            howManyMeetings: meetingsList.length
          });
        });
      } else {
        this.setState({ user: null });
      }
    });
  }

  registerUser = userName => {
    firebase.auth().onAuthStateChanged(FBuser => {
      FBuser.updateProfile({
        displayName: userName
      }).then(() => {
        this.setState({
          user: FBuser,
          displayName: FBuser.displayName,
          userID: FBuser.uid
        });
        navigate("/meetings");
      });
    });
  };

  logOutUser = e => {
    e.preventDefault();
    this.setState({
      user: null,
      displayName: null,
      userID: null
    });

    firebase
      .auth()
      .signOut()
      .then(() => {
        navigate("/login");
      });
  };

  addMeeting = meetingName => {
    const ref = firebase.database().ref(`meetings/${this.state.user.uid}`);
    ref.push({ meetingName: meetingName });
  };

  render() {
    return (
      <div>
        <Navigation user={this.state.user} logOutUser={this.logOutUser} />
        {this.state.user && (
          <Welcome
            userName={this.state.displayName}
            logOutUser={this.logOutUser}
          />
        )}
        <Router>
          <Home path="/" user={this.state.user} />
          <Login path="/login" user={this.state.user} />
          <Register path="/register" registerUser={this.registerUser} />
          <Meetings
            path="/meetings"
            meetings={this.state.meetings}
            addMeeting={this.addMeeting}
            userID={this.state.userID}
          />
          <CheckIn path="/checkin/:userID/:meetingID" />
          <Attendees
            path="/attendees/:userID/:meetingID"
            adminUser={this.state.userID}
          />
        </Router>
      </div>
    );
  }
}
export default App;
