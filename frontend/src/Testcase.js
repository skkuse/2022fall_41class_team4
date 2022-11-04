import React, { Component } from 'react';

class Testcase extends Component {
    render() {
        return (
            <div>
                <div className="left-header">
                    Example
                </div>
                <div className="test-block">
                    Input 1
                    <div className="test-line">
                        100
                        <span className="test-button">test</span>
                    </div>
                    Output 1
                    <div className="test-line">
                        1203912039812
                    </div>
                </div>
                <div className="test-block">
                    Input 2
                    <div className="test-line">
                        100
                        <span className="test-button">test</span>
                    </div>
                    Output 2
                    <div className="test-line">
                        1203912039812
                    </div>
                </div>
                <div className="test-block">
                    Input 3
                    <div className="test-line">
                        100
                        <span className="test-button">test</span>
                    </div>
                    Output 3
                    <div className="test-line">
                        1203912039812
                    </div>
                </div>
            </div>
        );
    }
}

export default Testcase;