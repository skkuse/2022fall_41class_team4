import React, { Component } from 'react';

class Explanation extends React.Component  {
    constructor(props){
      super(props)
      var text;
      if(this.props.title=="asdf"){
      this.state={
        name:"problem1 is a problem ~~"
      }
      }
    }

   
    
    render() {
      return (
        <div class="explain">
      <h2>Explanation Tab</h2>
     
     
      <h1>{this.state.name}</h1>
      </div>
      
      
      
      
      );
    }
  }
  export default Explanation;