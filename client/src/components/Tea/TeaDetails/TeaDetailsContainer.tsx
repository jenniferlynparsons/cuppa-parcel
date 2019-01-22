/* eslint-disable no-console */
import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { TeaDetailsProps, Tea } from "../../../interfaces/tea-interfaces";
import { AppState, FlashStatus } from "../../../interfaces/general-interfaces";
import { deleteTea } from "../../../actions/teaActions";
import { TeaDetails } from "./TeaDetails";
import { editTeaFlash } from "../../../actions/flashActions";

class TeaDetailsContainer extends Component<TeaDetailsProps, {}> {
  clickHandler = (
    e: React.MouseEvent<HTMLElement, MouseEvent>,
    status: FlashStatus
  ) => {
    this.props.updateFlash(status);
  };

  render() {
    return (
      <TeaDetails
        tea={this.props.tea}
        flash={this.props.flash}
        onClick={this.clickHandler}
        handleDelete={this.props.handleDelete}
        updateFlash={this.props.updateFlash}
      />
    );
  }
}

const mapStateToProps = (state: AppState, ownProps: Tea) => ({
  tea: state.teas.find(tea => tea.id === ownProps.match.params.id),
  flash: state.flash
});

const mapDispatchToProps = (dispatch: any) => ({
  handleDelete: (tea: Tea) => {
    dispatch(deleteTea(tea));
  },
  updateFlash: (status: FlashStatus) => {
    dispatch(editTeaFlash(status));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TeaDetailsContainer)
);
