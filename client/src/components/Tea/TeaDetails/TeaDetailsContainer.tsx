/* eslint-disable no-console */
import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { AppState, TeaDetailsProps, Tea } from "../../../interfaces";
import { deleteTea } from "../../../actions/teaActions";
import { TeaDetails } from "./TeaDetails";
import { editTeaFlash } from "../../../actions/flashActions";

export class TeaDetailsContainer extends React.Component<TeaDetailsProps, {}> {

  clickHandler = (e, status) => {
    this.props.updateFlash(status)
  }

  render() {
    return <TeaDetails tea={this.props.tea} flash={this.props.flash} onClick={this.clickHandler}/>;
  }
}

const mapStateToProps = (state: AppState, ownProps: Tea) => ({
  tea: state.teas.find(tea => tea.id === ownProps.match.params.id)
  flash: state.flash
});

const mapDispatchToProps = (dispatch: any) => ({
  handleDelete: (tea: Tea) => {
    dispatch(deleteTea(tea));
  },
  updateFlash: status => {
    console.log(status)
    dispatch(editTeaFlash(status));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TeaDetailsContainer)
);
