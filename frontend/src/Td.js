import React from "react";
import { useNavigate } from "react-router-dom";

class Td extends React.Component {
  render() {
    return (
      <div
        onClick={() => {
          this.props.navigate(
            "/problems/" + this.props.item.id + "?id=" + this.props.id + "&username=" + this.props.username
          );
        }}
        className="problemlist_element">
        {/* <div className="px-4 py-3 list">{this.props.item.id}</td> */}
        <div className="problem_name">{this.props.item.name}</div>
        <div className="problem_statistics">
          <div className={this.props.item.hardness === 1 ? "difficulty_veryeasy" : "difficulty_easy"}>난이도: {this.props.item.hardness}</div>
          <div>정답률: {this.props.item.solved_ratio * 100}%</div>
        </div>
      </div>
    );
  }
}

function withNavigation(Component) {
  return (props) => <Component {...props} navigate={useNavigate()} />;
}

export default withNavigation(Td);