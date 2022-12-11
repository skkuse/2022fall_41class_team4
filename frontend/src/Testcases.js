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
        <div className="testcases">테스트 케이스 실행결과</div> <br/>
          <span class="theader1">Testcase Output</span> <span class="theader"></span> <span class="theader">O/X </span>
        {
          this.props.testCaseList.map((elem) => {
            return (
              <div className="leftheader">
                <span className="testcase">
                  {`${i++}번` + (i <= 4 ? " 공개된 " : " 히든 ") + `테스트에 대한 채점 결과입니다.`}
                </span>
                <span className="comp">
                {i <= 4 ? (elem[0] == 0 ? elem[1] : elem[1] + " == " + elem[1]) : ("")}
                </span>
                <span className="results">
                
                  {elem[0] == 0 ? "틀렸습니다" : "맞았습니다!!"}
                  
                  
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
