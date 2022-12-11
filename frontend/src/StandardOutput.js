import React from "react";
import Chart from "react-apexcharts";
import SecondResult from "./SecondResult";
import FirstResult from "./FirstResult";
import ThirdResult from "./ThirdResult";
import "./Result.css";
import "./StandardOutput.css";
class StandardOutput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      output: "",
    };
  }
  render() {
    return (
      <>
        <div className="banner">테스트케이스:</div>
        <div>{this.state.output}</div>
      </>
    );
  }
}

export default StandardOutput;
