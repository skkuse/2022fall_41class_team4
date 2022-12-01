import React from "react";
import axios from "axios";
import Tr from "./Tr";
import Button from "react-bootstrap/Button";
import Header from "./Header";
import Form from "react-bootstrap/Form";
class ProblemList extends React.Component {
  state = {
    ProblemData: [],
    flag: false,
    id: "",
    user: "a",
    search: " ",
  };
  componentDidMount() {
    // Changing the state after 2 sec
    // from the time when the component
    // is rendered

    const params = new URLSearchParams(window.location.search);
    var name = params.get("username");
    var id = params.get("id");
    console.log(name);
    this.setState({ id: id, user: name }, () => {
      this.forceUpdate();
    });
  }
  shouldComponentUpdate() {
    if (this.state.flag && this.state.id != "") {
      return false;
    }
    return true;
  }

  handleChange = (e) => {
    this.setState({ search: e.target.value });

    this.forceUpdate();
  };
  getProblemData = () => {
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
        <Header name={this.state.user} />

        <div className="text-xl font-bold mt-5 mb-3 text-center">문제 목록</div>
        <table className="min-w-full table-auto text-gray-800">
          <thead className="justify-between">
            <tr class="banner">
              <th className="px-4 py-3">번호</th>
              <th className=" px-4 py-3">문제명</th>
              <th className=" px-4 py-3">난이도</th>
              <th className=" px-4 py-3">정답률</th>
            </tr>
          </thead>
          <Tr
            ProblemData={this.state.ProblemData}
            search={this.state.search}
            id={this.state.id}
          />
        </table>
        <Form.Group size="lg" controlId="email" class="passr">
          <Form.Control
            class="input"
            placeholder="search"
            autoFocus
            type="text"
            onChange={(e) => this.handleChange(e)}
          />
        </Form.Group>
        <Button id="button" block size="lg" onClick={() => this.search()}>
          search
        </Button>
      </div>
    );
  }
  return;
}

export default ProblemList;
