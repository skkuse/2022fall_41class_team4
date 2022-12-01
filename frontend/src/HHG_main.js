import React, { Component } from 'react';
import './HHG_main.css';
import Left from "./Left";
import Right_up from "./HHG_right_up"
import Right_down from "./HHG_right_down"

class HHG_main extends Component {
    render() {
        return (
            <div className="main_container">
                <div className="common_header_login">
                    <div className="home_button">
                        코테 연습
                    </div>
                    <div className="lecture_info">
                        과목명: 소프트웨어공학개론(SWE3002_41)
                    </div>
                    <div className="problem_info">
                        WEEK1: 피보나치 수
                    </div>
                    <div className="student_id">
                        2022000000
                    </div>
                    <div className="logout">
                        Log Out
                    </div>
                </div>
                <div className="main_content">
                    <div className="main_left">
                        <Left/>
                    </div>
                    <div className="main_right">
                        <div className="main_right_up">
                            <Right_up/>
                        </div>
                        <div className="main_right_down">
                            <Right_down/>
                        </div>
                    </div>
                </div>
                <div className="common_footer">
                    <div className="timer">
                        2시간 48분 2초 남았습니다.
                    </div>
                    <div className="go_back">
                        문제목록으로
                    </div>
                </div>
            </div>
        );
    }
}

export default HHG_main;