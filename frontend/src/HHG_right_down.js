import React, { Component } from 'react';
import './HHG_right_down.css';

class Right_down extends Component {
    render() {
        return (
            <div className="down_content">
                <div className="down_buttonlist">
                    <div className="down_button_activated">
                        실행 결과
                    </div>
                    <div className="down_button_inactivated">
                        채점 결과
                    </div>
                    <div className="down_button_inactivated">
                        제출 결과
                    </div>
                    <div className="down_button_inactivated">
                        코드 설명
                    </div>
                    <div className="down_button_inactivated">
                        관련 자료
                    </div>
                </div>
                <div className="down_content_activated">
                    this is terminal
                </div>
                <div className="down_content_inactivated">
                    숨겨진 채점 결과
                </div>
                <div className="down_content_inactivated">
                    숨겨진 제출 결과
                </div>
                <div className="down_content_inactivated">
                    숨겨진 코드 설명
                </div>
                <div className="down_content_inactivated">
                    숨겨진 관련 자료
                </div>
            </div>
        );
    }
}

export default Right_down;