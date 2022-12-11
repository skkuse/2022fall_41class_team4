import React, { Component } from 'react';
import './HHG_right_up.css';

class Right_up extends Component {
    render() {
        return (
            <div className="up_content">
                <div className="up_buttonlist">
                    <div className="language_button">
                        python3
                    </div>
                    <div className="up_button_space1">
                        {/* just empty space */}
                    </div>
                    <div className="up_button_group1">
                        <div className="file_button_default">
                            1
                        </div>
                        <div className="file_button_current">
                            2
                        </div>
                        <div className="file_button_saved">
                            3
                        </div>
                    </div>
                    <div className="up_button_space2">
                        {/* just empty space */}
                    </div>
                    <div className="up_button_group2">
                        <div className="blue_button">
                            초기화
                        </div>
                        <div className="blue_button">
                            저장
                        </div>
                        <div className="blue_button">
                            불러오기
                        </div>
                        <div className="blue_button">
                            실행
                        </div>
                    </div>
                    <div className="up_button_space3">
                        {/* just empty space */}
                    </div>
                    <div className="up_button_group3">
                        <div className="blue_button">
                            채점
                        </div>
                        <div className="blue_button">
                            dif ?
                        </div>
                        <div className="red_button">
                            제출
                        </div>
                    </div>
                </div>
                <div className="up_content_active">
                    this is code editor
                </div>
                <div className="up_content_inactive">
                    don't show this
                </div>
            </div>
        );
    }
}

export default Right_up;