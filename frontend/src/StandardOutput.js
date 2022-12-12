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
      stdoutCaseList: this.props.stdoutCaseList,
    };
  }
  render() {
    var i = 1;
    return (
      <>
        {
          this.props.stdoutCaseList.map((elem) => {
            return (
              <div>
                {`${i++}번 테스트에 대한 표준 출력 결과입니다.`}
                <br />
                {elem}
                <br />
                <br />
              </div>
            );
          })
        }
      </>
    );
  }
}

export default StandardOutput;
