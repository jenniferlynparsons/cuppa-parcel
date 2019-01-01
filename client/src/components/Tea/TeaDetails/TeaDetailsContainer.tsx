/* eslint-disable no-console */
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { AppState, TeaDetailsProps, Tea } from "../../../interfaces";
import { deleteTea } from "../../../actions/teaActions";
import { TeaDetails } from "./TeaDetails";

export class TeaDetailsContainer extends React.Component<TeaDetailsProps, {}> {
  render() {
    console.log(this.props);
    return <TeaDetails tea={this.props.tea} />;
  }
}

const mapStateToProps = (state: AppState, ownProps: Tea) => ({
  tea: state.teas.find(tea => tea.id === ownProps.match.params.id)
});

const mapDispatchToProps = (dispatch: any) => ({
  handleDelete: (tea: Tea) => {
    dispatch(deleteTea(tea));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TeaDetailsContainer)
);
