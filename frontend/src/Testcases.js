import React, { Component } from "react";
import "./Testcases.css";
class Testcases extends Component {
  constructor(props) {
    super(props);
    this.state = {
      testCaseList: this.props.testCaseList,
    };
  }
  render() {
    // return (
    //   <div>
    //     <div className="left-header">테스트 케이스</div>
    //     <div className="left-header">
    //       {" "}
    //       <span className="testcase">
    //         First Tescase: {this.state.testcaseone}{" "}
    //       </span>{" "}
    //       <span className="results">First Result: {this.state.resultone}</span>
    //     </div>
    //     <div className="left-header">
    //       {" "}
    //       <span className="testcase">
    //         First Tescase: {this.state.testcasetwo}{" "}
    //       </span>{" "}
    //       <span className="results">First Result: {this.state.resulttwo}</span>
    //     </div>
    //     <div className="left-header">
    //       {" "}
    //       <span className="testcase">
    //         First Tescase: {this.state.testcasethree}{" "}
    //       </span>{" "}
    //       <span className="results">
    //         First Result: {this.state.resultthree}
    //       </span>
    //     </div>
    //   </div>
    // );


    var i = 1;
    return (
      <>
        <div className="left-header">테스트 케이스</div>

        {
          this.props.testCaseList.map((elem) => {
            return (
              <div className="left-header">
                <span className="testcase">
                  {`${i++}번` + (i <= 4 ? " 공개된 " : " 히든 ") + `테스트에 대한 채점 결과입니다.`}
                </span>
                <br />
                <span className="results">
                  {elem[0] == 0 ? "틀렸습니다" : "맞았습니다!!"}
                  <br />
                  {i <= 4 ? (elem[0] == 0 ? elem[1] : elem[1] + " == " + elem[1]) : ("")}
                </span>

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

export default Testcases;
