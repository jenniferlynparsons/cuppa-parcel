import React from "react";
import { connect } from "react-redux";
import { TeaListProps, AppState, Tea } from "../../../interfaces";
import { deleteTea } from "../../../actions/teaActions";
import TeaList from "./TeaList";

export class TeaListContainer extends React.Component<TeaListProps> {
  handleDeleteClick = (tea: Tea) => {
    this.props.handleDelete(tea);
  };

  render() {
    return (
      <TeaList
        teas={this.props.teas}
        teaTypes={this.props.teaTypes}
        handleDelete={this.props.handleDelete}
      />
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  teas: state.teas,
  teaTypes: state.teaTypes
});

const mapDispatchToProps = (dispatch: any) => ({
  handleDelete: (tea: any) => {
    dispatch(deleteTea(tea));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeaListContainer);
