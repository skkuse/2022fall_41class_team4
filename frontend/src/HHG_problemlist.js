import React, { Component } from 'react';
import './HHG_problemlist.css';
import skku_icon from "./img/real_skku.png"

class HHG_problemlist extends Component {
    render() {
        return (
            <div className = "problemlist_container">
                <div className="common_header_logout">
                    <div className="home_button">
                        <img className="skku" alt="skku" src={skku_icon}/>
                        <div>코테 연습</div>
                    </div>
                    <div className="common_header_space3"/>
                    <div className="common_header_group3">
                        <div className="signin">
                            Sign In
                        </div>
                        <div className="signup">
                            Sign Up
                        </div>
                    </div>
                </div>
                <div className="problemlist_content">
                    <div className="problemlist_inner">
                        <div className="problemlist_left">
                            <div className="prolemlist_left_container">
                                <div className="problemlist_title">
                                    문제 목록
                                </div>
                                <div className="problem_search">
                                    문제 이름 검색
                                </div>
                                <div className="sort_options">
                                    <div className="problem_sorting_standard">
                                        정렬기준
                                    </div>
                                    <div className="hr">
                                        <hr></hr>
                                    </div>
                                    <div className="sorting_activated">
                                        난이도
                                    </div>
                                    <div className="sorting_inactivated">
                                        최신
                                    </div>
                                    <div className="sorting_inactivated">
                                        제출 수
                                    </div>
                                    <div className="sorting_inactivated">
                                        정답률
                                    </div>
                                    <div className="sorting_inactivated">
                                        랜덤
                                    </div>
                                </div> 
                            </div>
                        </div>
                        <div className="problemlist_right">
                            <div className="problemlist_up">
                                <ul className="problemlist_list">

                                    <li className="problemlist_element">
                                        <div className="problem_name">Fibonacci Numbers</div>
                                        <div className="problem_statistics">
                                            <div className="difficulty_easy">난이도: 쉬움</div>
                                            <div>정답률: 70%</div>
                                            <div>제출 수: 2000</div>
                                        </div>
                                    </li>

                                    <li className="problemlist_element">
                                        <div className="problem_name">Fibonacci Numbers</div>
                                        <div className="problem_statistics">
                                            <div className="difficulty_medium">난이도: 중간</div>
                                            <div>정답률: 50%</div>
                                            <div>제출 수: 2000</div>
                                        </div>
                                    </li>

                                    <li className="problemlist_element">
                                        <div className="problem_name">Fibonacci Numbers</div>
                                        <div className="problem_statistics">
                                            <div className="difficulty_veryeasy">난이도: 매우 쉬움</div>
                                            <div>정답률: 90%</div>
                                            <div>제출 수: 2000</div>
                                        </div>
                                    </li>

                                    <li className="problemlist_element">
                                        <div className="problem_name">Fibonacci Numbers</div>
                                        <div className="problem_statistics">
                                            <div className="difficulty_hard">난이도: 어려움</div>
                                            <div>정답률: 30%</div>
                                            <div>제출 수: 2000</div>
                                        </div>
                                    </li>

                                    <li className="problemlist_element">
                                        <div className="problem_name">Fibonacci Numbers</div>
                                        <div className="problem_statistics">
                                            <div className="difficulty_veryhard">난이도: 매우 어려움</div>
                                            <div>정답률: 10%</div>
                                            <div>제출 수: 2000</div>
                                        </div>
                                    </li>

                                    <li className="problemlist_element">
                                        {/* EMPTY LIST */}
                                    </li>
                                </ul>
                            </div>
                            <div className="problemlist_down">
                                <div className="problemlist_selector">&lt;</div>
                                <div className="problemlist_selector">1</div>
                                <div className="problemlist_selector">2</div>
                                <div className="problemlist_selector">3</div>
                                <div className="problemlist_selector">4</div>
                                <div className="problemlist_selector">5</div>
                                <div className="problemlist_selector">6</div>
                                <div className="problemlist_selector">&gt;</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default HHG_problemlist;