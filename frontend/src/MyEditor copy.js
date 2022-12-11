import React, { useRef, useState } from "react";

import Editor from "@monaco-editor/react";
import axios from "axios";

import CodeDiff from "react-code-diff-lite";
import Result from "./Result";



// 2번까지는 공개 테스트 케이스, 그 이후는 히든 테스트 케이스

// tabState
// 1 실행 (stdout)
// 2 채점
// 3 제출 (codediff, 각종 점수 ..)

function MyEditor({ no }) {
    const editorRef = useRef(null);
    const defaultCode = "def solution(num1, num2) {\n    \n}";

    var preset_id = 1;

    const [tabState, setTabState] = useState(3);

    const [userCode, setUserCode] = useState("");
    const [correctCode, setCorrectCode] = useState("");

    const [codeExplain, setCodeExplain] = useState("");

    const [userScore, setUserScore] = useState(100);

    const [effScore, setEffScore] = useState(100);
    const [readScore, setReadScore] = useState(100);

    function handleEditorDidMount(editor, monaco) {
        editorRef.current = editor;
        if (localStorage.getItem("key") == null) {
            localStorage.setItem("key", defaultCode);
        }
        editorRef.current.getModel().setValue(localStorage.getItem("key"));
    }

    function handleEdiorChange(value, event) {
        localStorage.setItem("key", value);
    }

    function submit() {
        alert("코드가 제출되었습니다. 결과를 로딩합니다.");

        axios.post(
            'http://146.56.165.145:8000/api/testcase/test/',
            {
                "user_id": 1,
                "problem_id": no,
                "user_code": editorRef.current.getValue(),
            }
        ).then(function (res) {
            const headers = {
                'Content-type': 'application/json',
                'Authorization': 'Bearer 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',
            }

            axios.post(
                "https://api.openai.com/v1/completions",
                {
                    "model": "code-davinci-002",
                    "prompt": editorRef.current.getValue(),
                    "temperature": 0,
                    "max_tokens": 64,
                    "top_p": 1.0,
                    "frequency_penalty": 0.0,
                    "presence_penalty": 0.0,
                },
                { headers }
            ).then(function (res2) {

                axios.get(
                    `http://146.56.165.145:8000/api/answers/${no}`
                ).then(function (res3) {
                    console.log(res3.data);
                    console.log(res.data.userProblemData);
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

                }).catch(function (error3) {
                    console.log(error3);
                }
                );

            }).catch(function (error2) {
                console.log(error2);
            }
            );

        }).catch(function (error) {
            console.log(error);
        }
        )
    }

    function copyCode() {
        window.navigator.clipboard.writeText(editorRef.current.getValue()).then(() => {
            alert("클립보드에 복사되었습니다.");
        });
    }

    function importData() {
        let input = document.createElement('input');
        input.type = 'file';
        input.onchange = _ => {
            // you can use this method to get file and perform respective operations
            let files = Array.from(input.files);
            let reader = new FileReader();
            reader.readAsText(files[0]);
            reader.onload = function () {
                editorRef.current.getModel().setValue(reader.result);
            }
        };
        input.click();

    }

    function codeInit() {
        editorRef.current.getModel().setValue(defaultCode);
        alert("기본 코드로 초기화되었습니다.");
    }


    function testCode() {
        axios.post(
            'http://146.56.165.145:8000/api/testcase/test/',
            {
                "user_id": 1,
                "problem_id": no,
                "user_code": editorRef.current.getValue(),
            }
        ).then(function (res) {
            console.log(res.data);




            setTabState(2);
        }).catch(function (error) {
            console.log(error);
        }
        )
    }

    function codeLoad() {
        axios.get(
            `http://146.56.165.145:8000/api/preset/1/${no}/${preset_id}`
        ).then(function (res) {
            console.log(res.data);
            editorRef.current.getModel().setValue(res.data.code);
            alert(`${preset_id}번 영역 코드를 불러왔습니다.`);
        }).catch(function (error) {
            console.log(error);
        }
        );
    }

    function codeSave() {
        axios.post(
            `http://146.56.165.145:8000/api/preset`,
            {
                "user_id": 1,
                "problem_id": no,
                "user_code": editorRef.current.getValue(),
                "preset_number": preset_id,
            }
        ).then(function (res) {
            console.log(res.data);
            alert(`${preset_id}번 영역에 코드를 저장했습니다.`);
        }).catch(function (error) {
            console.log(error);
        }
        );
    }


    function execute() {
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
            <button onClick={codeInit}>초기화</button>
            <button onClick={codeSave}>저장</button>
            <button onClick={codeLoad}>불러오기</button>
            <button onClick={execute}>실행</button>
            <button onClick={testCode}>채점</button>
            <button onClick={copyCode}>복사</button>
            <button onClick={importData}>파일 업로드</button>
            <button onClick={submit}>제출</button>

            <button onClick={() => { preset_id = 1 }} >1</button>
            <button onClick={() => { preset_id = 2 }} >2</button>
            <button onClick={() => { preset_id = 3 }} >3</button>

            <Editor
                height="80vh"
                defaultLanguage="python"
                defaultValue={userCode}
                onMount={handleEditorDidMount}
                onChange={handleEdiorChange}
            />

            {
                <>
                    {
                        tabState == 1 ? (
                            <></>
                        ) : <></>
                    }

                    {
                        tabState == 2 ? (
                            <>
                                총점: 60점
                            </>
                        ) : <></>
                    }

                    {
                        tabState == 3 ? (
                            <>
                                <CodeDiff oldStr={userCode} newStr={correctCode} context={10} />
                                <div >
                                    <Result score1={userScore} score2={effScore} score3={readScore} />
                                </div>

                                <div>
                                    코드 설명
                                    {codeExplain}
                                </div>

                                <div>
                                    관련 자료

                                </div>
                            </>
                        ) : <></>
                    }
                </>
            }






        </>


    );
}

export default MyEditor;