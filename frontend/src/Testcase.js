import React, { Component } from 'react';

class Testcase extends Component {
    render() {
        return (
            <div>
                <div className="left-header">
                    테스트 케이스
                </div>
                <div className="test-block">
                    <div className="test-header">
                        테스트 케이스 1
                    </div>
                    <div className="test-inout">
                        <div className="test-input">
                            <div className="test-inout-header">
                                Input:
                            </div>
                            <div className="input">
                                0
                            </div>
                        </div>
                        <div className="test-output">
                            <div className="test-inout-header">
                                Output:
                            </div>
                            <div className="output">
                                0
                            </div>
                        </div>
                    </div>
                </div>
                <div className="test-block">
                    <div className="test-header">
                        테스트 케이스 2
                    </div>
                    <div className="test-inout">
                        <div className="test-input">
                            <div className="test-inout-header">
                                Input:
                            </div>
                            <div className="input">
                                3
                            </div>
                        </div>
                        <div className="test-output">
                            <div className="test-inout-header">
                                Output:
                            </div>
                            <div className="output">
                                2
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default Testcase;