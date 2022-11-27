import React from "react";
import axios from "axios";
import Tr from "./Tr";
import Header from "./Header";
class ProblemList extends React.Component {
  state = {
    ProblemData: [],
    flag: false,
  };
  shouldComponentUpdate() {
    if (this.state.flag) {
      return false;
    }
    return true;
  }

  getProblemData = () => {
    console.log(1);
    // 임시 데이터 호출
    const base = "http://146.56.165.145:8000/api/problemlist";

    axios
      .get(base)
      .then((res) => {
        console.log(res.data);

        // 반환 형식 아직 정의되지 않음, 임시
        this.setState({
          ProblemData: res.data,
          flag: true,
        });
      })
      .catch((err) => {
        console.log(err);
      });
    console.log("done");
  };

  render() {
    {
      this.getProblemData();
    }

    return (
      <div className="container max-w-screen-lg mx-auto">
        <Header />
        <div className="text-xl font-bold mt-5 mb-3 text-center">문제 목록</div>

        <table className="min-w-full table-auto text-gray-800">
          <thead className="justify-between">
            <tr class="banner">
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
  }
  return;
}

export default ProblemList;
