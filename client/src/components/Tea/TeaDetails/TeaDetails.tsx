/* eslint-disable no-console */
import React, { SFC } from "react";
import { TeaDetailsProps } from "../../../interfaces";
import { Link } from "react-router-dom";

export const TeaDetails: SFC<TeaDetailsProps> = props => {
  return (
    <div className="container content">
      <h1>{props.tea.name}</h1>
      <ul>
        <li>
          <span className="has-text-grey-light">Brand:</span> {props.tea.brand}
        </li>
        <li>
          <span className="has-text-grey-light">Type:</span> {props.tea.teaType}
        </li>
        <li>
          <span className="has-text-grey-light">Servings:</span>{" "}
          {props.tea.servings}
        </li>
      </ul>
      <Link to={"/update-tea/" + props.tea.id} className="button">
        Edit
      </Link>
    </div>
  );
};
