import React from "react";
import axios from "axios";
import Tr from "./Tr";
import { Link } from "react-router-dom";

class ProblemList extends React.Component {
    state = {
        ProblemData: [],
    };

    getProblemData = () => {
        // 임시 데이터 호출
        // const base = "https://jsonplaceholder.typicode.com/";
        const base = "/";

        // axios.get(base + "users")
        axios.get(base + "problemlist")
            .then(
                (res) => {
                    console.log('!!!!!');
                    console.log(res);
                    console.log(res.data);

                    // 반환 형식 아직 정의되지 않음, 임시
                    this.setState({
                        ProblemData: res.data,
                    });
                }
            )
            .catch(
                (err) => {
                    console.log(err);
                }
            );
    };

    render() {
        this.getProblemData();

        return (
            <div className="container max-w-screen-lg mx-auto">
                <div className="text-xl font-bold mt-5 mb-3 text-center">
                    문제 목록
                </div>

                <table className="min-w-full table-auto text-gray-800">
                    <thead className="justify-between">
                        <tr className="bg-gray-800">
                            <th className="text-gray-300 px-4 py-3">번호</th>
                            <th className="text-gray-300 px-4 py-3">문제명</th>
                            <th className="text-gray-300 px-4 py-3">난이도</th>
                            <th className="text-gray-300 px-4 py-3">정답률</th>
                            <th className="text-gray-300 px-4 py-3">내 점수</th>
                        </tr>
                    </thead>
                    <Tr ProblemData={this.state.ProblemData} />

                </table>

            </div>
        );

    };

};

export default ProblemList;