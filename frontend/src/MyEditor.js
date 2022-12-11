import React, { useEffect, useRef, useState } from "react";

import Editor, { useMonaco } from "@monaco-editor/react";
import axios from "axios";

import CodeDiff from "react-code-diff-lite";
import Result from "./Result";

import "./HHG_main.css";
import "./HHG_problemlist.css";
import "./HHG_right_down.css";
import "./HHG_right_up.css";

// 2번까지는 공개 테스트 케이스, 그 이후는 히든 테스트 케이스

// tabState
// 1 실행 (stdout)
// 2 채점
// 3 제출 (codediff, 각종 점수 ..)

function MyEditor({ no }) {
  const editorRef = useRef(null);
  var defaultCode = "";
  var user_id = 0;
  var preset_id = 1;

  const [tabState, setTabState] = useState(3);

  const [userCode, setUserCode] = useState("");
  const [correctCode, setCorrectCode] = useState("");

  const [codeExplain, setCodeExplain] = useState("");

  const [userScore, setUserScore] = useState(100);

  const [effScore, setEffScore] = useState(100);
  const [readScore, setReadScore] = useState(100);


  useEffect(() => {
    axios
      .get(`http://146.56.165.145:8000/api/answers/${no}`)
      .then(function (res3) {
        user_id = new URLSearchParams(window.location.search).get("id");
        defaultCode = res3.data.answer_code;
        defaultCode = defaultCode.substring(0, defaultCode.indexOf('\n'));


        if (localStorage.getItem(user_id) == null) {
          localStorage.setItem(user_id, defaultCode);
        }
      })
      .catch(function (error3) {
        console.log(error3);
      });
  }, []);



  function handleEditorDidMount(editor, monaco) {
    editorRef.current = editor;

    while (localStorage.getItem(user_id) == null) { }
    editorRef.current.getModel().setValue(localStorage.getItem(user_id));
  }

  function handleEdiorChange(value, event) {
    localStorage.setItem("key", value);
  }

  function submit() {
    alert("코드가 제출되었습니다. 결과를 로딩합니다.");

    axios
      .post("http://146.56.165.145:8000/api/testcase/test/", {
        user_id: user_id,
        problem_id: no,
        user_code: editorRef.current.getValue(),
      })
      .then(function (res) {
        const headers = {
          "Content-type": "application/json",
          Authorization:
            "Bearer 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",
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
                setUserScore(res.data.userProblemData.user_score);
                setEffScore(res.data.efficiency_score);
                setReadScore(100 + 10 * parseInt(res.data.readability_score));
                setCodeExplain(res2.data.choices[0].text);
                setUserCode(editorRef.current.getValue());
                setCorrectCode(res3.data.answer_code);
                setTabState(3);

                console.log(userScore);
                console.log(effScore);
                console.log(readScore);
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
    editorRef.current.getModel().setValue(defaultCode);
    alert("기본 코드로 초기화되었습니다.");
  }

  function testCode() {
    axios
      .post("http://146.56.165.145:8000/api/testcase/test/", {
        user_id: user_id,
        problem_id: no,
        user_code: editorRef.current.getValue(),
      })
      .then(function (res) {
        console.log(res.data);
        setTabState(2);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function codeLoad() {
    axios
      .get(`http://146.56.165.145:8000/api/preset/1/${no}/${preset_id}`)
      .then(function (res) {
        console.log(res.data);
        editorRef.current.getModel().setValue(res.data.code);
        alert(`${preset_id}번 영역 코드를 불러왔습니다.`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function codeSave() {
    axios
      .post(`http://146.56.165.145:8000/api/preset`, {
        user_id: user_id,
        problem_id: no,
        user_code: editorRef.current.getValue(),
        preset_number: preset_id,
      })
      .then(function (res) {
        console.log(res.data);
        alert(`${preset_id}번 영역에 코드를 저장했습니다.`);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  function execute() {
    const headers = {
      "Content-type": "application/json",
      Authorization:
        "Bearer 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",
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
      .then(function (res) {
        console.log(res.data);
        console.log(res.data.choices[0].text);
        setCodeExplain(res.data.choices[0].text);
        setTabState(3);
      })
      .catch(function (error) {
        console.log(error);
      });

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

    alert("준비 중입니다.");
  }

  // 1 실행
  // 2 채점
  // 3 결과

  return (
    <>
      <div className="up_buttonlist">
        <button className="blue_button" onClick={codeInit}>
          초기화
        </button>
        <button className="blue_button" onClick={codeSave}>
          저장
        </button>
        <button className="blue_button" onClick={codeLoad}>
          불러오기
        </button>
        <button className="blue_button" onClick={execute}>
          실행
        </button>
        <button className="blue_button" onClick={testCode}>
          채점
        </button>
        <button className="blue_button" onClick={copyCode}>
          복사
        </button>
        <button className="blue_button" onClick={importData}>
          파일 업로드
        </button>
        <button className="red_button" onClick={submit}>
          제출
        </button>

        <button
          className="file_button_saved"
          onClick={() => {
            preset_id = 1;
          }}
        >
          1
        </button>
        <button
          className="file_button_saved"
          onClick={() => {
            preset_id = 2;
          }}
        >
          2
        </button>
        <button
          className="file_button_saved"
          onClick={() => {
            preset_id = 3;
          }}
        >
          3
        </button>
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
            실행
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
              {tabState === 1 ? <StandardOutput /> : <></>}

              {tabState === 2 ? <>총점: 60점</> : <></>}

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
                    {codeExplain}
                  </div>

                  <div>관련 자료</div>
                </>
              ) : (
                <></>
              )}
            </>
          }
        </div>
      </div>
    </>
  );
}

export default MyEditor;
