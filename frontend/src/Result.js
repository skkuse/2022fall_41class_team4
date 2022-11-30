import React, { Component } from "react";
import Chart from "react-apexcharts";
import { useState } from "react";
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
              Tab 1
            </li>
            <li
              className={this.state.activeTab === 2 ? "active" : ""}
              onClick={() => this.handleTab2()}
            >
              Tab 2
            </li>
            <li
              className={this.state.activeTab === 3 ? "active" : ""}
              onClick={() => this.handleTab3()}
            >
              Tab 3
            </li>
          </ul>
          <div className="outlet">
            {
              <>
                {this.state.activeTab === 1 ? (
                  <FirstResult />
                ) : (
                  <></>
                )}
                 {this.state.activeTab === 2 ? (
                  <SecondResult />
                ) : (
                  <></>
                )}
                   {this.state.activeTab === 3 ? (
                  <ThirdResult />
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
