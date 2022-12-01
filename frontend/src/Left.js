import React, { Component } from 'react';
import Statement from './Statement';
import Testcase from './Testcase';
import './Left.css';

class Left extends Component {
    render() {
        return (
            <div className="left_container">
                <Statement />
                <Testcase />
            </div>
        );
    }
}

export default Left;