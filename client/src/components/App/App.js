import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import jwt_decode from "jwt-decode";
import setAuthToken from "../../utils/setAuthToken";
import { setCurrentUser, logoutUser } from "../../actions/authActions";
import { Provider } from "react-redux";
import store from "../../store";
// Routes
import NavBar from "../Template/NavBar";
import Footer from "../Template/Footer";
import Landing from "../Landing";
import Register from "../Auth/Register";
import Login from "../Auth/Login";
import PrivateRoute from "../Auth/PrivateRoute/PrivateRoute";
import Dashboard from "../Dashboard";
import TeaEditor from "../Tea/TeaEditor";
import TeaList from "../Tea/TeaList";
import TeaDetails from "../Tea/TeaDetails";
// Styles
import "../../../node_modules/bulma/bulma.sass";
import "../../common_styles/global.scss";

// Check for token to keep user logged in
if (localStorage.jwtToken) {
  // Set auth token header auth
  const token = localStorage.jwtToken;
  setAuthToken(token);
  // Decode token and get user info and exp
  const decoded = jwt_decode(token);
  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));
  // Check for expired token
  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.exp < currentTime) {
    // Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "./login";
  }
}
class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <NavBar />
            <section className="section">
              <div className="App">
                <Route exact path="/" component={Landing} />
                <Route exact path="/register" component={Register} />
                <Route exact path="/login" component={Login} />
                {/* <Route path="/tea-collection" component={TeaList} /> */}
                <Route exact path="/new-tea" component={TeaEditor} />
                {/* <Route exact path="/edit-tea/:id" component={TeaEditor} /> */}
                {/* <Route exact path="/tea/:id" component={TeaDetails} /> */}
                <Switch>
                  <PrivateRoute exact path="/dashboard" component={Dashboard} />
                </Switch>
              </div>
            </section>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}
export default App;
