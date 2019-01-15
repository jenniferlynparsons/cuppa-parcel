import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { loginAction } from "../../../actions/authActions";
import classnames from "classnames";

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.handleSubmit(userData);

    // dispatch(loginAction(userData));
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="container content">
        <Link to="/">Back to home</Link>
        <h1>Login</h1>
        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
        <form noValidate onSubmit={this.onSubmit}>
          <div className="field">
            <label className="label">Email</label>
            <div className="control">
              <input
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
                className={classnames("input", {
                  invalid: "input is-danger"
                })}
              />
            </div>
            <span className="help is-danger">
              {errors.email}
              {errors.emailnotfound}
            </span>
          </div>
          <div className="field">
            <label className="label">Password</label>
            <input
              onChange={this.onChange}
              value={this.state.password}
              error={errors.password}
              id="password"
              type="password"
              className={classnames("input", {
                invalid: "input is-danger"
              })}
            />
            <span className="help is-danger">
              {errors.password}
              {errors.passwordincorrect}
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

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

const mapDispatchToProps = dispatch => ({
  handleSubmit: userData => {
    dispatch(loginAction(userData));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
