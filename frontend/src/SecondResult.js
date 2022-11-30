import React, { Component } from "react";
import Chart from "react-apexcharts";
class SecondResult extends React.Component {
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
          <div classname="result">
          효율점수:{this.state.data}
          </div>
        </div>
      </>
    );
  }
}

export default SecondResult;
