import React, { Component } from 'react';

class Statement extends Component {
    render() {
        return (
            <div>
                <div className="left-header">
                    문제 설명
                </div>
                <div className="left-content">
                    <b>문제</b>
                    <div>
                        피보나치 수는 0과 1로 시작하며, 다음피보나치 수는 바로 앞의 두 피보나치 수의 합이 된다. n = 0, 1, ... 에 해당하는 피보나치 수는 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, ... 이다.
                    </div>
                    <br/>
                    <div>
                        n번째 피보나치 수를 리턴하시오.
                    </div>
                    <br/>
                    <b>제약사항</b>
                    <div>
                        0 &lt;= n &lt;= 80<br/>
                        리턴 타입이 int 가 아니라는 것에 유의!
                    </div>
                </div>
            </div>
        );
    }
}

export default Statement;