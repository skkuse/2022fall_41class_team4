import React, { Component } from "react";

class Testcase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testcaseone: "",
      testcasetwo: "",
      testcasethree: "",
      resultone: "",
      resulttwo: "",
      resultthree: "",
    };
  }
  render() {
    var i = 1;

    return (
      <div>
        <div className="left-header">테스트 케이스</div>

        <div>
          {this.props.testCases.map((elem) => {
            return (
              <div className="test-block">
                <div className="test-header">{"테스트 케이스 " + (i++)}</div>
                <div className="test-inout">
                  <div className="test-input">
                    <div className="input">{elem.testCase_in}</div>
                  </div>
                  <div className="test-output">
                    <div className="output">{elem.testCase_out}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Testcase;
