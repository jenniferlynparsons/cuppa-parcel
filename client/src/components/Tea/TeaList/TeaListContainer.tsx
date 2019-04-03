import React from "react";
import { connect } from "react-redux";
import { TeaListProps, Tea } from "../../../interfaces/tea-interfaces";
import { AppState, UserId } from "../../../interfaces/general-interfaces";
import { deleteTea, getTeas } from "../../../actions/teaActions";
import TeaList from "./TeaList";

export class TeaListContainer extends React.Component<TeaListProps, AppState> {
  handleDeleteClick = (tea: Tea) => {
    this.props.handleDelete(tea);
  };

  componentDidMount() {
    this.props.getTeaList(this.props.userID);
  }

  render() {
    return (
      <TeaList
        userID={this.props.userID}
        teas={this.props.teas}
        teaTypes={this.props.teaTypes}
        handleDelete={this.props.handleDelete}
        getTeaList={this.props.getTeaList}
        getUser={this.props.getUser}
      />
    );
  }
}

const mapStateToProps = (state: AppState) => ({
  teas: state.teas,
  teaTypes: state.teaTypes,
  userID: state.auth.user.id
});

const mapDispatchToProps = (dispatch: any) => ({
  handleDelete: (tea: any) => {
    dispatch(deleteTea(tea));
  },
  getTeaList: (userID: UserId) => {
    dispatch(getTeas({ listOwner: userID }));
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeaListContainer);
