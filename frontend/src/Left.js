import React, { useState, useEffect } from "react";
import axios from "axios";
import Statement from "./Statement";
import Testcase from "./Testcase";
import "./Left.css";

import { useParams } from "react-router-dom";
import MyEditor from "./MyEditor";

import SplitPane, { Pane } from "react-split-pane";
import Result from "./Result";

import skku_icon from "./img/real_skku.png";

import "./HHG_main.css";
import "./HHG_problemlist.css";
import "./HHG_right_down.css";
import "./HHG_right_up.css";
// import React from "react";
import { useNavigate } from "react-router-dom";

function Left() {
  const navigate = useNavigate();
  const navigate_home= ()=>{
    alert();
    navigate("/problemlist");

  }

  const [state, setState] = useState({
    problemInfo: {},
    testCases: [],
  });

  const [loading, setLoading] = useState(false);

  let { no } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const problemInfo = await axios(
        `http://146.56.165.145:8000/api/problem/${no}`
      );
      const testCases = await axios(
        `http://146.56.165.145:8000/api/testcase/${no}`
      );
      setState({
        problemInfo: problemInfo.data,
        testCases: testCases.data,
      });
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="common_header_login">
        <div className="home_button" onclick={navigate_home} style={{cursur:'pointer'}}>
          <img className="skku" alt="skku" src={skku_icon} />
          <div style={{width:"200px"}}>코딩테스트 연습</div>
        </div>
        <div className="common_header_space1" />
        <div className="common_header_group1">
          {/* <div className="lecture_info">
                        과목명: 소프트웨어공학개론(SWE3002_41)
                    </div> */}
          <div className="problem_info">두 개 뽑아서 더하기</div>
        </div>
        <div className="common_header_space2" />
        <div className="common_header_group2">
          {/* <div className="student_id">
                        2022000000
                    </div>
                    <div className="logout">
                        Log Out
                    </div> */}
        </div>
      </div>
      <SplitPane
        split="vertical"
        minSize={300}
        defaultSize={700}
        style={{ position: "relative", overflow: "hidden" }}
      >
        <Pane
          style={{ height: "100%", overflowY: "scroll", overflowX: "hidden" }}
        >
          <Statement
            description={state.problemInfo.description}
            restrictions={state.problemInfo.restrictions}
          />
          <Testcase testCases={state.testCases} />
        </Pane>

        <Pane>
          <MyEditor no={no} />
        </Pane>
      </SplitPane>
      <div style={{background:"black", width:"100%", height:"40px"}}>hi</div>
    </div>

  );
}



export default Left;
