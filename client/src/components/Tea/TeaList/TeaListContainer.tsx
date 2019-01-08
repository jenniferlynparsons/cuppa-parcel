import React from "react";
import { connect } from "react-redux";
import { TeaListProps, AppState, Tea } from "../../../interfaces";
import { deleteTea, getTeas } from "../../../actions/teaActions";
import { getCurrentUser } from "../../../actions/authActions";
import TeaList from "./TeaList";

export class TeaListContainer extends React.Component<TeaListProps> {
  handleDeleteClick = (tea: Tea) => {
    this.props.handleDelete(tea);
  };

  componentDidMount() {
    this.props.getUser();
    this.props.getTeaList(this.props.userID);
  }

  componentWillReceiveProps(teaProps) {
    console.log(teaProps);
  }

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
  teaTypes: state.teaTypes,
  userID: state.auth.user.id
});

const mapDispatchToProps = (dispatch: any) => ({
  handleDelete: (tea: any) => {
    dispatch(deleteTea(tea));
  },
  getTeaList: userID => {
    console.log("getTeaList");
    dispatch(getTeas({ userID: userID }));
  },
  getUser: () => {
    console.log("getUser");
    dispatch(getCurrentUser());
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TeaListContainer);
