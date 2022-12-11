import React, { Component } from 'react';

class Statement extends Component {
    render() {
        console.log(this.props.description);

        return (
            <div style={{height:"50%"}}>
                <div className="left-header" style={{fontSize:"25px", padding:"5px 10px"}}>
                    문제 설명
                </div>
                <div className="left-content">
                    <b style={{fontSize:"20px"}}>문제</b>
                    <div style={{fontSize:"17px", paddinLeft:"5px"}}>
                        {this.props.description}
                    </div>
                    <br/>
                    <b style={{fontSize:"20px", marginTop:"25px"}}>제약사항</b>
                    <div style={{fontSize:"17px", paddinLeft:"5px"}}>
                        {this.props.restrictions}
                    </div>
                </div>
            </div>
        );
    }
}

export default Statement;