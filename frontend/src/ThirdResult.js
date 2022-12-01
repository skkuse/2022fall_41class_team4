import React, { Component } from "react";
import Chart from "react-apexcharts";
class ThirdResult extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        data: this.props.dataParentToChild
    }
  }

  render() {
    return (
      <>
        <div className="FirstTab">
          <div className="result">
            가독성 점수: {this.state.data}
            </div>
        </div>
      </>
    );
  }
}

export default ThirdResult;
