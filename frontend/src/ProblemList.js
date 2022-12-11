import React from "react";
import axios from "axios";
import Tr from "./Tr";
import Header from "./Header";
import Form from "react-bootstrap/Form";
import "./problemlist.css";
import CommonHeader_Noinfo from "./CommonHeader_Noinfo"

class ProblemList extends React.Component {
  state = {
    ProblemData: [],
    flag: false,
    id: "",
    user: "a",
    search: " ",
  };
  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    var name = params.get("username");
    var id = params.get("id");
    console.log(name);
    this.setState({ id: id, user: name }, () => {
      this.forceUpdate();
    });
  }
  shouldComponentUpdate() {
    if (this.state.flag && this.state.id !== "") {
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
    this.getProblemData();

    return (
      <div className="problemlist_container">
        {/* <Header name={this.state.user} /> */}
        <CommonHeader_Noinfo id={this.state.id} username={this.state.user}/>

        <div className="problemlist_container_inner">
          <div className="problemlist_left_container">
            <div className="problemlist_title">문제 목록</div>
            <div className="Search">
              <Form.Group size="lg" controlId="email" class="passr">
                <Form.Control
                  class="input"
                  placeholder="search"
                  autoFocus
                  type="text"
                  onChange={(e) => this.handleChange(e)}
                />
                <img src={require("./glass.png")} />
              </Form.Group>
            </div>
          </div>
          <div className="problemlist_right_container">
            <ul className="problemlist_list">
              <Tr
                ProblemData={this.state.ProblemData}
                search={this.state.search}
                id={this.state.id}
                username={this.state.user}
              />
              <li>
                <div className="problemlist_element" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
  return;
}

export default ProblemList;
