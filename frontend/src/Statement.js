import axios from 'axios';
import React, { Component } from 'react';

class Statement extends Component {
    state = {
        StatementData: [{id:0,name:'~',hardness:0,solved_ratio:0.01,description:'~',restrictions:null}],
        flag: false,
    };
    shouldComponentUpdate() {
        if (this.state.flag) {
          return false;
        }
        return true;
    }
    
    getStatementData = () => {
        const base = "http://146.56.165.145:8000/api/problem/1";

        axios
            .get(base)
            .then((res) => {
            //console.log(res.data);

            this.setState({
                StatementData: res.data,
                flag: true,
            });
            })
            .catch((err) => {
                console.log(err);
            });
        //console.log("done");
    };
    
    render() {
        {
            this.getStatementData();
        }
        return (
            <div>
                <div className="left-header">
                {/* {console.log("start")}
                {console.log(this.state.StatementData.description)}
                {console.log("end")} */}
                문제 설명
                </div>
                <div className="left-content">
                    <b>문제</b>
                    <div>
                        {this.state.StatementData.description}
                    </div>
                    <br/>
                    <b>제약사항</b>
                    <div>
                        {this.state.StatementData.restrictions}
                    </div>
                </div>
            </div>
        );
    }
    return;
}

export default Statement;