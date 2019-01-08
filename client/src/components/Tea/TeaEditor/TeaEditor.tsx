/* eslint-disable no-console */
import React from "react";
import uuidv4 from "uuid/v4";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { TeaEditorProps, Errors } from "../../../interfaces";
import { addTea, editTea, getTeas } from "../../../actions/teaActions";
import { editTeaFlash } from "../../../actions/flashActions";

export class TeaEditor extends React.Component<TeaEditorProps, {}> {
  state = {
    flash: {
      name: "",
      id: ""
    },
    touched: {
      name: false,
      servings: false
    },
    userID: this.props.userID,
    id: "",
    name: "",
    brand: "",
    teaType: "",
    servings: "",
    edit: false
  };

  validate = (name: string, servings: string) => {
    return {
      name: name.length === 0,
      servings: servings.length === 0
    };
  };

  handleBlur = (field: HTMLFormElement) => () => {
    this.setState({
      touched: { ...this.state.touched, [field]: true }
    });
  };

  handleNameChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      name: event.currentTarget.value
    });
  };

  handleBrandChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      brand: event.currentTarget.value
    });
  };

  handleTypeChange = (event: React.FormEvent<HTMLSelectElement>) => {
    this.setState({
      ...this.state,
      teaType: event.currentTarget.value
    });
  };

  handleServingsChange = (event: React.FormEvent<HTMLInputElement>) => {
    this.setState({
      ...this.state,
      servings: event.currentTarget.value
    });
  };

  handleSubmitButton = (e, errors: Errors) => {
    if (!this.state.id) {
      this.setState({
        ...this.state,
        id: uuidv4()
      });
    }

    this.setState({
      touched: {
        ...this.state.touched,
        name: errors.name,
        servings: errors.servings
      }
    });
  };

  handleFormSubmit = (
    event: React.FormEvent<HTMLFormElement>,
    errors: Errors
  ) => {
    event.preventDefault();
    if ((errors.servings || errors.name) === false) {
      this.props.handleSubmit(this.state);
      if (this.state.edit === true) {
        this.props.updateFlash(true);
        this.props.history.push("/tea/" + this.state.id);
      } else {
        this.setState({
          flash: {
            name: this.state.name,
            id: this.state.id
          },
          touched: {
            name: false,
            servings: false
          },
          id: "",
          userID: this.props.userID,
          name: "",
          brand: "",
          teaType: "",
          servings: "",
          edit: false
        });
      }
    }
  };

  componentDidMount() {
    this.props.getTeaList(this.props.userID);
  }

  componentWillReceiveProps(teaProps) {
    const filterTeas = this.props.teas.filter(
      t => t.id === teaProps.match.params.id
    );
    const currentTea = { ...filterTeas[0] };
    // console.log(currentTea);
    if (currentTea.id) {
      this.setState({ ...currentTea, edit: true });
    } else {
      this.setState({ edit: false });
    }
  }

  render() {
    const errors = this.validate(this.state.name, this.state.servings);
    // TODO refine validation on form submit
    const isDisabled = Object.keys(errors).some(x => errors[x]);
    const shouldMarkError = (field: string) => {
      const hasError = errors[field];
      const shouldShow = this.state.touched[field];

      return hasError ? shouldShow : false;
    };

    return (
      <div className="container">
        {this.state.flash.name ? (
          <div className="notification is-success">
            {this.state.flash.name} has been succesfully saved.{" "}
            <Link to={"../../tea/" + this.state.flash.id}>View details</Link>
          </div>
        ) : (
          ""
        )}

        <form onSubmit={e => this.handleFormSubmit(e, errors)}>
          <div className="field">
            <label htmlFor="name">
              Tea Name
              <div className="control">
                <input
                  className={
                    shouldMarkError("name") ? "input is-danger" : "input"
                  }
                  type="text"
                  id="name"
                  onChange={this.handleNameChange}
                  value={this.state.name}
                  placeholder="Tea Name"
                  onBlur={this.handleBlur("name")}
                />
              </div>
              {shouldMarkError("name") ? (
                <p className="help is-danger">Add a Tea Name</p>
              ) : (
                ""
              )}
            </label>
          </div>
          <div className="field">
            <label htmlFor="brand">
              Tea Brand
              <div className="control">
                <input
                  className="input"
                  type="text"
                  id="brand"
                  onChange={this.handleBrandChange}
                  value={this.state.brand}
                  placeholder="Tea Brand"
                />
              </div>
            </label>
          </div>
          <div className="field">
            <label htmlFor="type">
              Type
              <div className="control">
                <div className="select">
                  <select
                    disabled={!this.props.teaTypes.length}
                    id="type"
                    value={this.state.teaType}
                    onChange={this.handleTypeChange}
                    onBlur={this.handleTypeChange}
                  >
                    <option />
                    {this.props.teaTypes.map(type => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </label>
          </div>
          <div className="field">
            <label htmlFor="servings">
              Servings Available
              <div className="control">
                <input
                  className={
                    shouldMarkError("servings") ? "input is-danger" : "input"
                  }
                  type="number"
                  id="servings"
                  onChange={this.handleServingsChange}
                  value={this.state.servings}
                  placeholder="Servings Available"
                  onBlur={this.handleBlur("servings")}
                />
              </div>
              {shouldMarkError("servings") ? (
                <p className="help is-danger">Add a Number of Servings</p>
              ) : (
                ""
              )}
            </label>
          </div>
          <div className="control">
            <button
              className={
                isDisabled ? "button is-disabled" : "button is-primary"
              }
              onClick={e => this.handleSubmitButton(e, errors)}
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state: TeaEditorState) => ({
  teas: state.teas,
  teaTypes: state.teaTypes,
  userID: state.auth.user.id
});

const mapDispatchToProps = (dispatch: any) => ({
  handleSubmit: (tea: any) => {
    if (tea.edit === true) {
      dispatch(editTea(tea));
    } else {
      // console.log(tea);
      dispatch(addTea(tea));
    }
  },
  getTeaList: userID => {
    dispatch(getTeas(userID));
  },
  updateFlash: status => {
    dispatch(editTeaFlash(status));
  }
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(TeaEditor)
);
