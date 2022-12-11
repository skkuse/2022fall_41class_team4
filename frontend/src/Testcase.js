import React, { Component } from 'react';

class Testcase extends Component {
    render() {


        return (
            <div style={{height:"50%"}}>
                <div className="left-header" style={{fontSize:"25px", padding:"5px 10px"}}>
                    테스트 케이스
                </div>

                <div>
                    {
                        this.props.testCases.map((elem) => {
                            return (

                                <div className="test-block">
                                    <div className="test-header">
                                        {"테스트 케이스" + elem.id}
                                    </div>
                                    <div className="test-inout">
                                        <div className="test-input">
                                            <div className="input">
                                                {elem.testCase_in}
                                            </div>
                                        </div>
                                        <div className="test-output">
                                            <div className="output">
                                                {elem.testCase_out}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            );
                        })
                    }
                </div>


            </div>
        );
    }
}

export default Testcase;