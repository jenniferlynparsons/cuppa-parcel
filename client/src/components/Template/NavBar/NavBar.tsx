import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.scss";
import tea from "../../../common_styles/tea.svg";

const NavBar = () => (
  <nav
    className="navbar is-dark"
    role="navigation"
    aria-label="main navigation"
  >
    <div className="navbar-brand">
      <Link className="navbar-item" to="/">
        <img src={tea} alt="Cuppa logo" />
      </Link>
    </div>
    <div className="navbar-menu is-active">
      <div className="navbar-start" />
      <div className="navbar-end">
        <ul>
          <li>
            <Link className="button is-primary" to={"/new-tea"}>
              Add a Tea
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default NavBar;
