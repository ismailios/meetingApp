import React, { Component } from "react";
import { Link } from "@reach/router";

class Welcome extends Component {
  render() {
    const { userName, logOutUser } = this.props;
    return (
      <div className="text-center mt-3">
        <span className="text-secondary font-weight-bold pl-1 mt-3">
          Welcome {userName}
        </span>
        ,
        <Link
          onClick={e => logOutUser(e)}
          to="/"
          className="font-weight-bold text-primary pl-1"
        >
          log out
        </Link>
      </div>
    );
  }
}
export default Welcome;
