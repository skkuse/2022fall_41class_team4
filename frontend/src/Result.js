import React, { Component } from "react";
import Chart from "react-apexcharts";
import SecondResult from "./SecondResult";
import FirstResult from "./FirstResult";
import ThirdResult from "./ThirdResult";
import "./Result.css"
class Result extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [25, 15, 44, 55, 41, 17],
      options: {
        chart: {
          type: "donut",
        },
        labels: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
        ],
        responsive: [
          {
            breakpoint: 480,
            options: {
              chart: {
                width: 200,
              },
              legend: {
                position: "bottom",
              },
            },
          },
        ],
      },
      activeTab: -1,
      score1: 21,
      score2: 24,
      score3: 33,
    };
  }
  handleTab1 = () => {
    this.setState({
      activeTab: 1,
    });
    console.log(1);
  };

  handleTab2 = () => {
    this.setState({
      activeTab: 2,
    });
  };
  handleTab3 = () => {
    this.setState({
      activeTab: 3,
    });
  };

  render() {
    return (
      <>
        <div id="chart">
          <Chart
            options={this.state.options}
            series={this.state.series}
            type="donut"
            height={200}
            width={400}
          />
        </div>
        <div className="Tabs">
          {/* Tab nav */}
          <ul className="nav">
            <li
              className={this.state.activeTab === 1 ? "active" : ""}
              onClick={() => this.handleTab1()}
            >
            기능 점수 
            </li>
            <li
              className={this.state.activeTab === 2 ? "active" : ""}
              onClick={() => this.handleTab2()}
            >
              효율 점수
            </li>
            <li
              className={this.state.activeTab === 3 ? "active" : ""}
              onClick={() => this.handleTab3()}
            >
            가독성 점수
            </li>
          </ul>
          <div className="outlet">
            {
              <>
                {this.state.activeTab === 1 ? (
                  <FirstResult dataParentToChild = {this.state.score1} />
                ) : (
                  <></>
                )}
                 {this.state.activeTab === 2 ? (
                  <SecondResult dataParentToChild = {this.state.score2} />
                ) : (
                  <></>
                )}
                   {this.state.activeTab === 3 ? (
                  <ThirdResult dataParentToChild = {this.state.score3} />
                ) : (
                  <></>
                )}
              </>
            }
          </div>
        </div>
      </>
    );
  }
}

export default Result;
