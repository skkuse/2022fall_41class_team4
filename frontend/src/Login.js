import React, { useState } from "react";

import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";

class Login extends React.Component {
  constructor(props) {
    super(props);
    var text;
    if (this.props.title == "asdf") {
      this.state = {
        name: "problem1 is a problem ~~",
      };
    }
  }

  render() {
    return (
      <div className="Login">
        <Form>
          <Form.Group size="lg" controlId="email">
            <Form.Label>Email</Form.Label>

            <Form.Control autoFocus type="email" />
          </Form.Group>

          <Form.Group size="lg" controlId="password">
            <Form.Label>Password</Form.Label>

            <Form.Control type="password" />
          </Form.Group>

          <Button block size="lg" type="submit">
            Login
          </Button>
        </Form>
      </div>
    );
  }
}
export default Login;
