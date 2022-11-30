import React, { Component } from "react";
import Chart from "react-apexcharts";
import "./Result.css"
class FirstResult extends React.Component {
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
          <p>기능점수:  {this.state.data}</p>
        </div>
        </div>
      </>
    );
  }
}

export default FirstResult;
