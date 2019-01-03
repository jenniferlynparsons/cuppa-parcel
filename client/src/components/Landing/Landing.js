import React, { Component } from "react";
import { Link } from "react-router-dom";

class Landing extends Component {
  render() {
    return (
      <div className="container valign-wrapper">
        <div className="row">
          <div className="">
            <h4>
              <b>Build</b> a login/auth app with the <span>MERN</span> stack
              from scratch
            </h4>
            <p className="flow-text grey-text text-darken-1">
              Create a (minimal) full-stack app with user authentication via
              passport and JWTs
            </p>
            <br />
            <Link to="/register" className="button is-primary">
              Register
            </Link>
            <Link to="/login" className="button is-primary">
              Log In
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Landing;
