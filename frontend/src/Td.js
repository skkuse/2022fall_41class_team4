import React from "react";
import { Link, useNavigate } from "react-router-dom";

class Td extends React.Component {
  render() {
    return (
      <>
        <tr
          onClick={() => {
            this.props.navigate("/problems/" + this.props.item.id);
          }}
          className="bg-white border-2 border-gray-200"
        >
          <td className="px-4 py-3 list">{this.props.item.id}</td>
          <td className="px-4 py-3 list">{this.props.item.name}</td>
          <td className="px-4 py-3 list">{this.props.item.hardness}</td>
          <td className="px-4 py-3 list">{this.props.item.solved_ratio}</td>
          <td className="px-4 py-3 list">{this.props.item.website}</td>
        </tr>
      </>
    );
  }
}

function withNavigation(Component) {
  return (props) => <Component {...props} navigate={useNavigate()} />;
}

export default withNavigation(Td);
