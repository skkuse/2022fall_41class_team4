import React, { useEffect, useId, useRef, useState } from "react";

import Editor, { useMonaco } from "@monaco-editor/react";
import axios from "axios";

import CodeDiff from "react-code-diff-lite";
import Result from "./Result";
import Testcases from "./Testcases";
import StandardOutput from "./StandardOutput";
import "./HHG_main.css";
import "./HHG_problemlist.css";
import "./HHG_right_down.css";
import "./HHG_right_up.css";

function MyEditor({ no }) {
  const editorRef = useRef(null);
  const [userId, setUserId] = useState(0);
  const [defaultCode, setDefaultCode] = useState("");
  const [presetId, setPresetId] = useState(1);
  const [tabState, setTabState] = useState(3);
  const [userCode, setUserCode] = useState("");
  const [correctCode, setCorrectCode] = useState("");
  const [codeExplain, setCodeExplain] = useState("");
  const [userScore, setUserScore] = useState(100);
  const [effScore, setEffScore] = useState(100);
  const [readScore, setReadScore] = useState(100);
  const [stdoutCaseList, setStdoutCaseList] = useState([]);
  const [testCaseList, setTestCaseList] = useState([]);
  const [refLink, setRefLink] = useState([]);


  useEffect(() => {
    setUserId(new URLSearchParams(window.location.search).get("id"));

    axios
      .get(`http://146.56.165.145:8000/api/answers/${no}`)
      .then(function (res) {
        var key = new URLSearchParams(window.location.search).get("id") + no;

        var code = res.data.answer_code;
        setDefaultCode(code.substring(0, code.indexOf('\n')));

        if (localStorage.getItem(key) == null) {
          localStorage.setItem(key, code.substring(0, code.indexOf('\n')));
        }
      })
      .catch(function (error) {
        console.log(error);
      });

  }, []);


  function handleEditorDidMount(editor, monaco) {
    var key = new URLSearchParams(window.location.search).get("id") + no;

    editorRef.current = editor;
    editor.getModel().setValue(localStorage.getItem(key));
  }

  function handleEdiorChange(value, event) {
    var key = new URLSearchParams(window.location.search).get("id") + no;

    localStorage.setItem(key, value);
  }

  function submit() {
    alert("코드가 제출되었습니다. 결과를 로딩합니다.");

    const apikey = "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";

    axios
      .post("http://146.56.165.145:8000/api/testcase/test/", {
        user_id: userId,
        problem_id: no,
        user_code: editorRef.current.getValue(),
      })
      .then(function (res) {
        const headers = {
          "Content-type": "application/json",
          Authorization:
            "Bearer " + apikey,
        };

        axios
          .post(
            "https://api.openai.com/v1/completions",
            {
              model: "code-davinci-002",
              prompt: editorRef.current.getValue(),
              temperature: 0,
              max_tokens: 64,
              top_p: 1.0,
              frequency_penalty: 0.0,
              presence_penalty: 0.0,
            },
            { headers }
          )
          .then(function (res2) {
            axios
              .get(`http://146.56.165.145:8000/api/answers/${no}`)
              .then(function (res3) {

                axios
                  .get(`http://146.56.165.145:8000/api/problem/${no}`)
                  .then(function (res4) {
                    var str = res4.data.reference.substring(1, res4.data.reference.length - 1);
                    var strSplit = str.split(',');
                    setRefLink(strSplit);
                    setUserScore(parseInt(res.data.userProblemData.user_score * 100));
                    setEffScore(res.data.efficiency_score);
                    setReadScore(100 + 10 * parseInt(res.data.readability_score));
                    setCodeExplain(res2.data.choices[0].text);
                    setUserCode(editorRef.current.getValue());
                    setCorrectCode(res3.data.answer_code);
                    setTabState(3);
                  })
                  .catch(function (error4) {
                    console.log(error4);
                  });



              })
              .catch(function (error3) {
                console.log(error3);
              });
          })
          .catch(function (error2) {
            console.log(error2);
          });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function copyCode() {
    window.navigator.clipboard
      .writeText(editorRef.current.getValue())
      .then(() => {
        alert("클립보드에 복사되었습니다.");
      });
  }

  function importData() {
    let input = document.createElement("input");
    input.type = "file";
    input.onchange = (_) => {
      // you can use this method to get file and perform respective operations
      let files = Array.from(input.files);
      let reader = new FileReader();
      reader.readAsText(files[0]);
      reader.onload = function () {
        editorRef.current.getModel().setValue(reader.result);
      };
    };
    input.click();
  }

  function codeInit() {
    // while (defaultCode == "") { }
    editorRef.current.getModel().setValue(defaultCode);
    var key = userId * 10000 + no;
    localStorage.setItem(key, defaultCode);

    alert("기본 코드로 초기화되었습니다.");
  }

  function testCode() {
    alert("각 테스트케이스에 대하여 채점을 진행합니다.");

    axios
      .post("http://146.56.165.145:8000/api/testcase/test/", {
        user_id: userId,
        problem_id: no,
        user_code: editorRef.current.getValue(),
      })
      .then(function (res) {
        console.log(res.data);

        const checkList = new Array((res.data.fails.length + res.data.success.length));

        for (var i = 0; i < res.data.fails.length; i++) {
          var tcnum = res.data.fails[i]['fail_testcase_num'];

          checkList[tcnum] = [0, res.data.fails[i]['fail_reasons']];
        }

        for (var i = 0; i < res.data.success.length; i++) {
          var tcnum = res.data.success[i]['success_testcase_num'];

          checkList[tcnum] = [1, res.data.success[i]['user_output']];
        }

        setTestCaseList(checkList);
        setTabState(2);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function codeLoad() {
    axios
      .get(`http://146.56.165.145:8000/api/preset/${userId}/${no}/${presetId}`)
      .then(function (res) {
        editorRef.current.getModel().setValue(res.data.code);
        alert(`${presetId}번 영역 코드를 불러왔습니다.`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function codeSave() {
    axios
      .post(`http://146.56.165.145:8000/api/preset`, {
        user_id: userId,
        problem_id: no,
        user_code: editorRef.current.getValue(),
        preset_number: presetId,
      })
      .then(function (res) {
        alert(`${presetId}번 영역에 코드를 저장했습니다.`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function execute() {
    alert("각 테스트케이스에 대하여 표준 출력을 보여줍니다.");

    console.log(userId);

    axios
      .post(`http://146.56.165.145:8000/api/testcase/consoletest/`, {
        user_id: userId,
        problem_id: no,
        user_code: editorRef.current.getValue(),
      })
      .then(function (res) {
        var tempList = res.data.stdout_list;
        var len = tempList.length;
        var realList = [];
        for (var i = 0; i < len; i += 2) {
          realList.push(tempList[i]);
        }
        setStdoutCaseList(realList);
      })
      .catch(function (error) {
        console.log(error);
      });

    // const headers = {
    //   "Content-type": "application/json",
    //   Authorization:
    //     "Bearer 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",
    // };

    // axios
    //   .post(
    //     "https://api.openai.com/v1/completions",
    //     {
    //       model: "code-davinci-002",
    //       prompt: editorRef.current.getValue(),
    //       temperature: 0,
    //       max_tokens: 64,
    //       top_p: 1.0,
    //       frequency_penalty: 0.0,
    //       presence_penalty: 0.0,
    //     },
    //     { headers }
    //   )
    //   .then(function (res) {
    //     console.log(res.data);
    //     console.log(res.data.choices[0].text);
    //     setCodeExplain(res.data.choices[0].text);
    //     setTabState(3);
    //   })
    //   .catch(function (error) {
    //     console.log(error);
    //   });

    // const headers = {
    //     'Content-type': 'application/json',
    //     'Authorization': 'Bearer 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',
    // }

    // axios.post(
    //     "https://api.openai.com/v1/completions",
    //     {
    //         "model": "code-davinci-002",
    //         "prompt": editorRef.current.getValue(),
    //         "temperature": 0,
    //         "max_tokens": 64,
    //         "top_p": 1.0,
    //         "frequency_penalty": 0.0,
    //         "presence_penalty": 0.0,
    //     },
    //     { headers }
    // ).then(function (res) {
    //     console.log(res.data.choices[0].text);
    //     setCodeExplain(res.data.choices[0].text);
    // }).catch(function (error) {
    //     console.log(error);
    // }
    // );

    // alert("준비 중입니다.");
  }

  // 1 실행
  // 2 채점
  // 3 결과

  return (
    <div className="myeditor_content">
      <div className="up_buttonlist">
        <div className="button_group_1">
          <button
            className="file_button_saved"
            onClick={() => {
              setPresetId(1);
            }}
          >
            1
          </button>
          <button
            className="file_button_saved"
            onClick={() => {
              setPresetId(2);
            }}
          >
            2
          </button>
          <button
            className="file_button_saved"
            onClick={() => {
              setPresetId(3);
            }}
          >
            3
          </button>
        </div>
        <div className="button_group_2">
          <button className="blue_button" onClick={codeInit}>
            초기화
          </button>
          <button className="blue_button" onClick={codeSave}>
            저장
          </button>
          <button className="blue_button" onClick={execute}>
            실행
          </button>
        </div>
        <div className="button_group_3">
          <button className="blue_button" onClick={codeLoad}>
            불러오기
          </button>
          <button className="blue_button" onClick={copyCode}>
            복사
          </button>
          <button className="blue_button" onClick={importData}>
            파일 업로드
          </button>
        </div>
        <div className="button_group_4">
          <button className="blue_button" onClick={testCode}>
            채점
          </button>
          <button className="red_button" onClick={submit}>
            제출
          </button>
        </div>
      </div>
      <Editor
        height="35vh"
        defaultLanguage="python"
        defaultValue={userCode}
        onMount={handleEditorDidMount}
        onChange={handleEdiorChange}
      />
      <div className="bigtabs">
        <ul className="nav">
          <li
            className={{ tabState } === 1 ? "active" : ""}
            onClick={() => {
              setTabState(1);
            }}
          >
            Standard Output
          </li>
          <li
            className={{ tabState } === 2 ? "active" : ""}
            onClick={() => {
              setTabState(2);
            }}
          >
            실행결과
          </li>
          <li
            className={{ tabState } === 3 ? "active" : ""}
            onClick={() => {
              setTabState(3);
            }}
          >
            점수
          </li>
        </ul>
        <div className="realout">
          {
            <>
              {tabState === 1 ? <StandardOutput stdoutCaseList={stdoutCaseList} /> : <></>}

              {tabState === 2 ? <Testcases testCaseList={testCaseList} /> : <></>}

              {tabState === 3 ? (
                <>
                  <CodeDiff
                    oldStr={userCode}
                    newStr={correctCode}
                    context={10}
                  />
                  <div className="con">
                    <Result
                      score1={userScore}
                      score2={effScore}
                      score3={readScore}
                    />
                  </div>

                  <div>
                    코드 설명
                    <br />
                    {codeExplain}
                    <br />
                    <br />
                  </div>

                  <div>
                    관련 자료
                    <br />
                    {
                      refLink.map((elem) => {
                        return (
                          <>
                            <a href={elem}>{elem}</a>
                            <br />
                          </>
                        )
                      })

                    }
                  </div>
                </>
              ) : (
                <></>
              )}
            </>
          }
        </div>
      </div>
    </div>
  );
}

export default MyEditor;