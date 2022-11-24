import React, { Component } from 'react';
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
class Popup extends React.Component  {
    constructor(props){
      super(props)
      this.state = {
        "showStore":true
        
      }  
     
    }
    handleClick(){
        this.setState({
            showStore: !this.state.showStore
           });
           this.props.toggle();
    }
   
    
    render() {
      return (
        <div class="popup" style={{display: this.state.showStore ? 'block' : 'none' }}>
        <Button id="del" block size="lg" onClick={() => this.handleClick()}>x</Button>
      <h5 class="sign">Sign Up</h5>
      <Form id='form1'>
      <Form.Group size="lg" controlId="email" class="passr2">



        <Form.Control class="input" placeholder="Email" autoFocus type="text" onChange={(e) => this.handleChange1(e)} />
            </Form.Group>
       
          <Form.Group size="lg" controlId="email" class="passr2">



            <Form.Control class="input" placeholder="ID" autoFocus type="text" onChange={(e) => this.handleChange1(e)} />
          </Form.Group>

          <Form.Group size="lg" controlId="password" class="passr2">


            <Form.Control class="input" placeholder="Password" type="password" onChange={(e) => this.handleChange(e)} />
          </Form.Group>
          <Button id="button" block size="lg" onClick={this.togglePop}>
          Submit
        </Button>
        </Form>
     
     
      </div>
      
      
      
      
      );
    }
  }
  export default Popup;