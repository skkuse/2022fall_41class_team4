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

import CommonHeader from "./CommonHeader";

function Left() {
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
    <div className="left_content">
      <CommonHeader id={new URLSearchParams(window.location.search).get("id")} username={new URLSearchParams(window.location.search).get("username")}/>
      <SplitPane
        split="vertical"
        minSize={300}
        defaultSize={"45%"}
        style={{ position: "relative", overflow: "hidden" }}
      >
        <Pane
          // style={{ height: "50vh", overflowY: "scroll", overflowX: "hidden" }}
          style={{ overflowY: "scroll", overflowX: "hidden" }}
          className="mysplit"
        >
          <Statement
            description={state.problemInfo.description}
            restrictions={state.problemInfo.restrictions}
          />
          <Testcase testCases={state.testCases} />
        </Pane>

        <Pane className="mysplit2">
          <MyEditor no={no} />
        </Pane>
      </SplitPane>
      <div className="common_footer">
        this is footer
      </div>
    </div>
  );
}

export default Left;
