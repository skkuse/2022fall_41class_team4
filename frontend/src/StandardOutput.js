import React from "react";

import "./Result.css";
import "./StandardOutput.css";
class StandardOutput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      output: "3",
    };
  }
  render() {
    return (
      <>
        <div className="banner">Standard Output:</div>
        <div>{this.state.output}</div>
      </>
    );
  }
}

export default StandardOutput;
