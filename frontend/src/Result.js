import React from "react";
import Chart from "react-apexcharts";
import SecondResult from "./SecondResult";
import FirstResult from "./FirstResult";
import ThirdResult from "./ThirdResult";
import "./Result.css";
class Result extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score1: this.props.score1,
      score2: this.props.score2,
      score3: this.props.score3,
      series: [this.props.score1, this.props.score2, this.props.score3],
      options: {
        chart: {
          type: "donut",
        },
        labels: ["기능 점수", "효율성 점수", "가독성 점수"],
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
            series={[this.props.score1, this.props.score2, this.props.score3]}
            type="donut"
            height={150}
            width={300}
          />
        </div>
        <div className="Tabs">
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
                  <FirstResult dataParentToChild={this.props.score1} />
                ) : (
                  <></>
                )}
                {this.state.activeTab === 2 ? (
                  <SecondResult dataParentToChild={this.props.score2} />
                ) : (
                  <></>
                )}
                {this.state.activeTab === 3 ? (
                  <ThirdResult dataParentToChild={this.props.score3} />
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
