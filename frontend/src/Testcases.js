import React, { Component } from "react";
import "./Testcases.css";
class Testcases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testcaseone: "22",
      testcasetwo: "23",
      testcasethree: "24",
      resultone: "1",
      resulttwo: "2",
      resultthree: "23",
    };
  }
  render() {
    return (
      <div>
        <div className="left-header">테스트 케이스</div>
        <div className="left-header">
          {" "}
          <span className="testcase">
            First Tescase: {this.state.testcaseone}{" "}
          </span>{" "}
          <span className="results">First Result: {this.state.resultone}</span>
        </div>
        <div className="left-header">
          {" "}
          <span className="testcase">
            First Tescase: {this.state.testcasetwo}{" "}
          </span>{" "}
          <span className="results">First Result: {this.state.resulttwo}</span>
        </div>
        <div className="left-header">
          {" "}
          <span className="testcase">
            First Tescase: {this.state.testcasethree}{" "}
          </span>{" "}
          <span className="results">
            First Result: {this.state.resultthree}
          </span>
        </div>
      </div>
    );
  }
}

export default Testcases;
