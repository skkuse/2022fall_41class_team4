import React from "react";
import skku_icon from "./img/real_skku.png";

class CommonHeader extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
        <div className="common_header_login">
            <a href={"/Problemlist?id="+this.props.id+"&username="+this.props.username}>
                <div className="home_button">
                <img className="skku" alt="skku" src={skku_icon} />
                <div>코딩테스트 연습</div>
                </div>
            </a>
            <div className="common_header_space1" />
            <div className="common_header_group1">
            {/* <div className="lecture_info">
                            과목명: 소프트웨어공학개론(SWE3002_41)
                        </div> */}
            {/* <div className="problem_info">두 개 뽑아서 더하기</div> */}
            </div>
            <div className="common_header_space2" />
            <div className="common_header_group2">
                <div className="student_id">
                    {this.props.username}
                </div>
                <a href="/login">
                    <div className="logout">
                        Log out
                    </div>
                </a>
            </div>
        </div>
        );
    }
}

export default CommonHeader;