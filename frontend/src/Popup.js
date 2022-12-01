import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import axios from "axios";
class Popup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showStore: true,
      email: "",
      username: "",
      password: "",
    };
  }
  handleClick() {
    this.setState({
      showStore: !this.state.showStore,
    });
    this.props.toggle();
  }

  handleClick1() {
    console.log("ID" + this.state.email);
    console.log("PW" + this.state.password);
    console.log("Email" + this.state.username);
    axios.defaults.withCredentials = true;

    axios
      .post("http://146.56.165.145:8000/api/users", {
        email: this.state.email,
        password: this.state.password,
        username: this.state.username,
      })
      .then((response) => {
        console.log(response);
        alert("Accont Created");
      })
      .catch(function (error) {
        if (error.response) {
          console.log(error.response.status);
          alert("Account Creation Failure");
        }
      });
  }
  handleChange2 = (e) => {
    this.setState({ email: e.target.value });
  };
  handleChange1 = (e) => {
    this.setState({ username: e.target.value });
  };
  handleChange = (e) => {
    this.setState({ password: e.target.value });
  };

  render() {
    return (
      <div
        class="popup"
        style={{ display: this.state.showStore ? "block" : "none" }}
      >
        <Button id="del" block size="lg" onClick={() => this.handleClick()}>
          x
        </Button>
        <h5 class="sign">Sign Up</h5>
        <Form id="form1">
          <Form.Group size="lg" controlId="email" class="passr2">
            <Form.Control
              class="input"
              placeholder="Email"
              autoFocus
              type="text"
              onChange={(e) => this.handleChange2(e)}
            />
          </Form.Group>

          <Form.Group size="lg" controlId="email" class="passr2">
            <Form.Control
              class="input"
              placeholder="Username"
              autoFocus
              type="text"
              onChange={(e) => this.handleChange1(e)}
            />
          </Form.Group>

          <Form.Group size="lg" controlId="password" class="passr2">
            <Form.Control
              class="input"
              placeholder="Password"
              type="password"
              onChange={(e) => this.handleChange(e)}
            />
          </Form.Group>
          <Button
            id="button"
            block
            size="lg"
            onClick={() => this.handleClick1()}
          >
            New Account
          </Button>
        </Form>
      </div>
    );
  }
}
export default Popup;
