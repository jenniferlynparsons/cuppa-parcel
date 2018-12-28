/* eslint-disable no-console */
import React from "react";
import { connect } from "react-redux";
import { AppState, TeaDetailsProps, Tea } from "../../../interfaces";
import { deleteTea } from "../../../actions/teaActions";
import { TeaDetails } from "./TeaDetails";

export class TeaDetailsContainer extends React.Component<TeaDetailsProps, {}> {
  render() {
    return <TeaDetails tea={this.props.tea} />;
  }
}

const mapStateToProps = (state: AppState, ownProps: Tea) => ({
  tea: state.teas.find(tea => tea.id === ownProps.id)
});

const mapDispatchToProps = (dispatch: any) => ({
  handleDelete: (tea: Tea) => {
    dispatch(deleteTea(tea));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeaDetailsContainer);
