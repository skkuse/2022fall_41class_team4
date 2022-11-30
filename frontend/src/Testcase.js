import axios from 'axios';
import React, { Component } from 'react';

class Testcase extends Component {
    state = {
        TestcaseData: [{id:0,name:'~',hardness:0,solved_ratio:0.01,description:'~',restrictions:null}],
        flag: false,
    };
    shouldComponentUpdate() {
        if (this.state.flag) {
          return false;
        }
        return true;
    }
    
    getTestcastData = () => {
        const base = "http://146.56.165.145:8000/api/testcase/1";

        axios
            .get(base)
            .then((res) => {
            console.log(res.data);

            this.setState({
                TestcaseData: res.data,
                flag: true,
            });
            })
            .catch((err) => {
                console.log(err);
            });
        console.log("done");
    };

    render() {
        {
            this.getTestcastData();
        }
        return (
            <div>
                {console.log(this.state.TestcaseData.length)}
                <div className="left-header">
                    테스트 케이스
                </div>
                {this.state.TestcaseData.map((content,index) => {
                    return (
                        <div className="test-block">
                            <div className="test-header">
                                테스트 케이스 {content.id}
                            </div>
                            <div className="test-inout">
                                <div className="test-input">
                                    <div className="test-inout-header">
                                        Input:
                                    </div>
                                    <div className="input">
                                        {content.testCase_in}
                                    </div>
                                </div>
                                <div className="test-output">
                                    <div className="test-inout-header">
                                        Output:
                                    </div>
                                    <div className="output">
                                    {content.testCase_out}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    }
    return;
}

export default Testcase;