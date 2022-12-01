import React, { Component } from 'react';
import axios from 'axios';

class ExecutionResult extends React.Component{
    state
    executeData = ()=> {
        const apiUrl = "";
        try{
            const response = axios.get(apiUrl);
            //response.data
            //코드 넣는 코드 들어가야함
            //code받아서 입력
            // 점수 생성?
        }
        catch(err){
            console.log('왼쪽의 전구를 통해 에러를 수정하세요.');
            //에러 메시지 출력
        }
    }
    render () {
        this.executeData();
    }
}

export default ExecutionResult;
