import React, { useState } from "react";

import Form from "react-bootstrap/Form";

import Button from "react-bootstrap/Button";
import axios from "axios"

class Login extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      "email": '',
      "password": '',
      
    }  
   
    
  }
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
   
    axios.post('http://146.56.165.145:8000/api/login/',this.state,{withCredentials: false})
        .then(response => console.log({ response }));
  }

  render() {
    return (
      <div className="Login">
        <Form id='form'>
         
          <Form.Group size="lg" controlId="email" class="passr">
     
          
              
            <Form.Control class="input" placeholder="ID" autoFocus type="text" onChange={(e)=>this.handleChange1(e)} />
          </Form.Group>
           
          <Form.Group size="lg" controlId="password" class="passr" >
            
           
            <Form.Control class="input" placeholder="Password" type="password" onChange={(e)=>this.handleChange(e)} />
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
