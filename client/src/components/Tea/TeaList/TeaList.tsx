import React from "react";
import { Link } from "react-router-dom";
import { TeaListProps, Tea } from "../../../interfaces/tea-interfaces";

export class TeaList extends React.Component<TeaListProps, {}> {
  handleDeleteClick = (tea: Tea) => {
    this.props.handleDelete(tea);
  };

  render() {
    return (
      <div className="container">
        <table className="table is-striped is-fullwidth">
          <thead>
            <tr>
              <td>Name</td>
              <td>Brand</td>
              <td>Type</td>
              <td>Quantity</td>
              <td />
              <td />
            </tr>
          </thead>
          <tbody>
            {this.props.teas.map(tea => {
              return (
                <tr key={tea.id}>
                  <td>
                    <Link to={"tea/" + tea.id}>{tea.name}</Link>
                  </td>
                  <td>{tea.brand}</td>
                  <td>{tea.teaType}</td>
                  <td>{tea.servings}</td>
                  <td>
                    <Link to={"/update-tea/" + tea.id}>Edit</Link>
                  </td>
                  <td>
                    <button
                      className="button is-danger is-small"
                      onClick={() => this.handleDeleteClick(tea)}
                    >
                      X
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default TeaList;
