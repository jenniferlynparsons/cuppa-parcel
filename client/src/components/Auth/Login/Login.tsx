import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginAction } from "../../../actions/authActions";
import { AppState } from "../../../interfaces/general-interfaces";
import { UserProps, UserState } from "../../../interfaces/auth-interfaces";
import classnames from "classnames";

class Login extends Component<UserProps, UserState> {
  state = {
    email: "",
    password: "",
    errors: {
      email: "",
      emailnotfound: "",
      password: "",
      passwordincorrect: ""
    }
  };

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      console.log(typeof history);
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps: UserProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.currentTarget.id]: e.currentTarget.value });
  };

  onSubmit: React.ReactEventHandler<HTMLInputElement> = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.handleSubmit(userData);
  };

  render() {
    return (
      <div className="container content">
        <Link to="/">Back to home</Link>
        <h1>Login</h1>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
        <form noValidate={true} onSubmit={this.onSubmit}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                onChange={this.onChange}
                value={this.state.email}
                error={this.state.errors.email}
                id="email"
                type="email"
                className={classnames("input", {
                  invalid: "input is-danger"
                })}
              />
            </div>
            <span className="help is-danger">
              {this.state.errors.email}
              {this.state.errors.emailnotfound}
            </span>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <input
              onChange={this.onChange}
              value={this.state.password}
              error={this.state.errors.password}
              id="password"
              type="password"
              className={classnames("input", {
                invalid: "input is-danger"
              })}
            />
            <span className="help is-danger">
              {this.state.errors.password}
              {this.state.errors.passwordincorrect}
            </span>
          </div>
          <div className="field">
            <div className="control">
              <button type="submit" className="button is-primary">
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = (dispatch: any) => ({
  handleSubmit: (userData: UserState) => {
    dispatch(loginAction(userData));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
