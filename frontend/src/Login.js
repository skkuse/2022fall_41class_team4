import React, { useState } from "react";

import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
import axios from "axios"
import Popup from "./Popup"

class Login extends React.Component {
 
  constructor(props) {
    super(props);
    this.state = {
      "email": '',
      "password": '',
      seen: false
      
    }  
   
    
  }
  togglePop = () => {
 
   
    this.setState({
     seen: !this.state.seen
    });
  
 
    console.log(this.state.seen);
   };
 handleChange = (e) => {
    this.setState({"email": e.target.value});
  
}
 handleChange1 = (e) => {
  this.setState({"password": e.target.value});
  
 
}
  handleClick() {
    console.log("ID"+this.state.email);
    console.log("PW"+this.state.password);
    axios.defaults.withCredentials = true;
   
    axios.post('http://146.56.165.145:8000/api/login/',{"email":this.state.email,"password":this.state.password})
    .then(response => {
      console.log(response);
      window.location.replace('/Problemlist');
    })

  }

  render() {
    return (
      <div className="Login">
        <Form id='form'>
        <Button id="new1" block size="lg" onClick={() => this.handleClick()}>
          New Account
        </Button>
          <Form.Group size="lg" controlId="email" class="passr">



            <Form.Control class="input" placeholder="ID" autoFocus type="text" onChange={(e) => this.handleChange(e)} />
          </Form.Group>

          <Form.Group size="lg" controlId="password" class="passr">


            <Form.Control class="input" placeholder="Password" type="password" onChange={(e) => this.handleChange1(e)} />
          </Form.Group>
          <Button id="new" block size="lg" onClick={this.togglePop}>
          New Account
        </Button>
        </Form>

        <Button id="button" block size="lg" onClick={() => this.handleClick()}>
          Login
        </Button>
        {this.state.seen ? <Popup toggle={this.togglePop} /> : null}


      </div>
   
      
    );
  }
}
export default Login;
