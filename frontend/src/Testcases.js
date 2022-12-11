import React, { Component } from "react";

class Testcases extends Component {
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
    return (
      <div>
        <div className="left-header">테스트 케이스</div>
      </div>
    );
  }
}

export default Testcases;
