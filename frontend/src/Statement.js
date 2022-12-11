import React, { Component } from 'react';

class Statement extends Component {
    render() {
        console.log(this.props.description);

        return (
            <div>
                <div className="left-header">
                    문제 설명
                </div>
                <div className="left-content">
                    <b>문제</b>
                    <div>
                        {this.props.description}
                    </div>
                    <b>제약사항</b>
                    <div>
                        {this.props.restrictions}
                    </div>
                </div>
            </div>
        );
    }
}

export default Statement;