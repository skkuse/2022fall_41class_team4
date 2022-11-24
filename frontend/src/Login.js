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
  handleClick() {
    console.log('this is:', this);
  }

  render() {
    return (
      <div className="Login">
        <Form id='form'>
         
          <Form.Group size="lg" controlId="email" class="passr">
     
          
              
            <Form.Control class="input" placeholder="ID" autoFocus type="email" />
          </Form.Group>
           
          <Form.Group size="lg" controlId="password" class="passr" >
            
           
            <Form.Control class="input" placeholder="Password" type="password" />
          </Form.Group>
        
        </Form>
     
        <Button id="button" block size="lg" onClick={() => this.handleClick()}>
            Login
          </Button>
      </div>
    );
  }
}
export default Login;
