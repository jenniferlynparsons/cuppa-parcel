import React, { Component } from "react";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import { UserProps } from "../../interfaces/auth-interfaces";
import { AppState } from "../../interfaces/general-interfaces";

class Dashboard extends Component<UserProps, AppState> {
  onLogoutClick = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { user } = this.props.auth;
    // console.log(this.props);
    return (
      <div className="container content">
        <h1>Hey there, {user.name.split(" ")[0]}</h1>
        <div className="columns">
          <div className="column is-two-thirds">
            <h2>Your stats</h2>
            <p>You currently have XX teas in your collection</p>
          </div>
          <div className="column is-one-third">
            <p>You are logged in as {user.email}</p>
            <p>
              <button className="button" onClick={this.onLogoutClick}>
                Logout
              </button>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
